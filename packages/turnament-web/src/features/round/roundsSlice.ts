import {
	getSchedulerByType,
	isEliminator,
	type Match,
	type Player,
	type SchedulerType,
} from "turnament-scheduler";

import type { StateCreator } from "zustand";
import type { RootState } from "../../app/store";
import type { PlayersSlice } from "../players/playersSlice";
import { sum, uniq } from "es-toolkit";

interface State {
	schedulerType: SchedulerType | undefined;
	matches: Match[];
	currentRoundNum: number;
	minPointsToWin: number;
}
interface Actions {
	addRound: (players: Player[]) => void;
	nextRound: () => void;
	readdRound: (players: Player[]) => void;
	resetRounds: () => void;
	setSchedulerType: (type: SchedulerType) => void;
	setMinPointsToWin: (value: number) => void;
	updateMatch: (matchToUpdate: Match) => void;
}

export const DEFAULT_POiNTS_TO_WIN = 5;

const initialState: State = {
	schedulerType: undefined,
	matches: [],
	currentRoundNum: 0,
	minPointsToWin: 0,
};

export type RoundsSlice = State & Actions;

export const createRoundsSlice: StateCreator<
	RoundsSlice & PlayersSlice,
	[["zustand/immer", never]],
	[],
	RoundsSlice
> = (set, get) => ({
	...initialState,
	setSchedulerType(type) {
		set((state) => {
			state.schedulerType = type;
		});
	},
	addRound(players) {
		const schedulerType = get().schedulerType;
		const roundID = ++get().currentRoundNum;

		if (!schedulerType) return;

		const scheduler = getSchedulerByType(schedulerType);
		const matches = get().matches;

		const newRound = scheduler.makeRound(players, matches, roundID);

		if (isEliminator(scheduler)) {
			scheduler.eliminate(players, matches);
		}

		set((state) => {
			state.matches.push(...newRound);
		});
	},
	readdRound(players) {
		const roundID = get().currentRoundNum;
		const schedulerType = get().schedulerType;
		const matches = get().matches;

		if (schedulerType) return;

		const roundsWithoutCurrent = matches.filter(
			(round) => round.roundID !== roundID,
		);

		if (!schedulerType) return;

		const scheduler = getSchedulerByType(schedulerType);
		const newRound = scheduler.makeRound(players, matches, roundID);

		set((state) => {
			state.matches = [...roundsWithoutCurrent, ...newRound];
		});
	},
	updateMatch(matchToUpdate: Match) {
		set((state) => {
			const index = state.matches.findIndex(
				(match) => match.ID === matchToUpdate.ID,
			);
			if (index !== -1) state.matches[index] = matchToUpdate;
		});
	},
	nextRound() {
		const schedulerType = get().schedulerType;
		const players = get().players;
		const matches = get().matches;

		if (schedulerType) {
			const scheduler = getSchedulerByType(schedulerType);

			if (isEliminator(scheduler)) {
				const playersToEliminate = scheduler.eliminate(players, matches);

				for (const player of playersToEliminate) {
					get().deactivatePlayer(player);
				}
			}
		}

		get().addRound(players);
	},
	resetRounds() {
		set(initialState);
	},
	setMinPointsToWin(value: number) {
		set((state) => {
			state.minPointsToWin = value;
		});
	},
});

export const selectMinRoundNeeded = (state: RootState): number => {
	if (!state.schedulerType) return 0;

	const scheduler = getSchedulerByType(state.schedulerType);
	return scheduler.roundsNeeded(state.players.length);
};

export const selectCurrentRound = (state: RootState): Match[] =>
	state.matches.filter(
		(match) => match.roundID === state.currentRoundNum && !match.hasBye,
	);

export const selectRoundsPlayedNum = (state: RootState) => {
	return Math.max(state.currentRoundNum - 1, 0);
};

export const selectPreviousRounds = (state: RootState): Match[] =>
	state.matches
		.filter((match) => match.roundID !== state.currentRoundNum && !match.hasBye)
		.reverse();

export const selectPreviousRoundsNum = (state: RootState) =>
	uniq(selectPreviousRounds(state).map((m) => m.roundID));

export const selectIsRoundCompleted = (state: RootState): boolean =>
	selectCurrentRound(state).every(({ result }) =>
		result.some((it) => it === state.minPointsToWin),
	);

export const selectMatchesByRoundID = (roundID: number) => (state: RootState) =>
	state.matches.filter((match) => match.roundID === roundID);

export const selectMinMatchesNeeded = (state: RootState) => {
	if (!state.schedulerType) return 0;

	const minRoundsNeeded = selectMinRoundNeeded(state);
	const playersNum = state.players.length;

	return Math.floor(playersNum / 2) * minRoundsNeeded;
};

export const selectMatchesPlayedNum = (state: RootState) => {
	return state.matches.filter((match) =>
		match.result.some((it) => it === state.minPointsToWin),
	).length;
};

export const selectMinGamesNeeded = (state: RootState) => {
	return selectMinMatchesNeeded(state) * state.minPointsToWin;
};

export const selectMaxGamesNeeded = (state: RootState) => {
	return selectMinMatchesNeeded(state) * (state.minPointsToWin * 2 - 1);
};

export const selectGamesPlayed = (state: RootState) => {
	return state.matches
		.filter((match) => match.hasBye === false)
		.reduce((acc, curr) => {
			return acc + sum(curr.result);
		}, 0);
};
