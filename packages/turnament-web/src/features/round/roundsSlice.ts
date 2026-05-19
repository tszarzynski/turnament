import {
	getSchedulerByType,
	isEliminator,
	type Match,
	type Player,
	type SchedulerType,
} from "turnament-scheduler";
import {
	getDefaultMatchConfig,
	getScoringDivisor,
	isMatchCompleted,
} from "turnament-ranking";

import type { StateCreator } from "zustand";
import type { RootState } from "../../app/store";
import type { PlayersSlice } from "../players/playersSlice";
import { sum, uniq } from "es-toolkit";

export type { SportType } from "turnament-ranking";

interface State {
	schedulerType: SchedulerType | undefined;
	sportType: SportType | undefined;
	scoringDivisor: number;
	matches: Match[];
	currentRoundNum: number;
	minPointsToWin: number;
}
export interface SavedState {
	players: Player[];
	nextPlayerID: number;
	schedulerType: SchedulerType | undefined;
	sportType: SportType | undefined;
	scoringDivisor: number;
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
	setSportType: (sport: SportType) => void;
	setMinPointsToWin: (value: number) => void;
	updateMatch: (matchToUpdate: Match) => void;
	restoreState: (saved: SavedState) => void;
}

const initialState: State = {
	schedulerType: undefined,
	sportType: undefined,
	scoringDivisor: 1,
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
	setSportType(sport) {
		set((state) => {
			state.sportType = sport;
			state.scoringDivisor = getScoringDivisor(sport);
		});
	},
	addRound(players) {
		const schedulerType = get().schedulerType;

		if (!schedulerType) return;

		const roundID = get().currentRoundNum + 1;
		const scheduler = getSchedulerByType(schedulerType);
		const matches = get().matches;

		const newRound = scheduler.makeRound(players, matches, roundID);

		if (isEliminator(scheduler)) {
			scheduler.eliminate(players, matches);
		}

		set((state) => {
			state.currentRoundNum = roundID;
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
	restoreState(saved: SavedState) {
		set((state) => {
			state.players = saved.players;
			state.nextPlayerID = saved.nextPlayerID;
			state.schedulerType = saved.schedulerType;
			state.sportType = saved.sportType;
			state.scoringDivisor = saved.scoringDivisor;
			state.matches = saved.matches;
			state.currentRoundNum = saved.currentRoundNum;
			state.minPointsToWin = saved.minPointsToWin;
		});
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
		isMatchCompleted(result, state.sportType, state.minPointsToWin),
	);

export const selectMatchesByRoundID = (roundID: number) => (state: RootState) =>
	state.matches.filter((match) => match.roundID === roundID);

export const selectMinMatchesNeeded = (state: RootState) => {
	if (!state.schedulerType) return 0;

	const scheduler = getSchedulerByType(state.schedulerType);
	const n = state.players.length;

	return scheduler.matchesNeeded
		? scheduler.matchesNeeded(n)
		: Math.floor(n / 2) * selectMinRoundNeeded(state);
};

export const selectMatchesPlayedNum = (state: RootState) => {
	return state.matches.filter(({ result }) =>
		isMatchCompleted(result, state.sportType, state.minPointsToWin),
	).length;
};

export const selectMinGamesNeeded = (state: RootState) => {
	return selectMinMatchesNeeded(state) * state.minPointsToWin;
};

export const selectMaxGamesNeeded = (state: RootState) => {
	const minMatches = selectMinMatchesNeeded(state);
	if (state.sportType === "CHESS") {
		// chess matches always play exactly minPointsToWin games — no spread
		return minMatches * state.minPointsToWin;
	}
	return minMatches * (state.minPointsToWin * 2 - 1);
};

export const selectGamesPlayed = (state: RootState) => {
	const raw = state.matches
		.filter((match) => match.hasBye === false)
		.reduce((acc, curr) => acc + sum(curr.result), 0);
	return raw / state.scoringDivisor;
};

export { getDefaultMatchConfig };
