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

interface State {
	schedulerType: SchedulerType | undefined;
	matches: Match[];
	currentRoundNum: number;
}
interface Actions {
	addRound: (players: Player[]) => void;
	nextRound: () => void;
	readdRound: (players: Player[]) => void;
	resetRounds: () => void;
	setSchedulerType: (type: SchedulerType) => void;
	updateMatch: (matchToUpdate: Match) => void;
}

const initialState: State = {
	schedulerType: undefined,
	matches: [],
	currentRoundNum: 0,
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

export const selectArchivedRound = (state: RootState): Match[] =>
	state.matches
		.filter((match) => match.roundID !== state.currentRoundNum && !match.hasBye)
		.reverse();

export const selectIsRoundCompleted = (state: RootState): boolean =>
	selectCurrentRound(state).every(({ result }) => result[0] !== result[1]);

export const selectMatchesByRoundID = (roundID: number) => (state: RootState) =>
	state.matches.filter((match) => match.roundID === roundID);
