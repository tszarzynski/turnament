import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getRanking,
  getSchedulerByType,
  Match,
  Player,
  SchedulerType
} from "turnament-scheduler";
import { RootState } from "../../app/reducers";
import { selectPlayersListAsArray } from "../players/playersSlice";

interface RoundsState {
  schedulerType: SchedulerType | undefined;
  rounds: Record<string, Match>;
  currentRoundNum: number;
}

let initialState: RoundsState = {
  schedulerType: undefined,
  rounds: {},
  currentRoundNum: 0
};

const roundsSlice = createSlice({
  name: "rounds",
  initialState,
  reducers: {
    setSchedulerType(
      state,
      { payload }: PayloadAction<{ schedulerType: SchedulerType }>
    ) {
      const { schedulerType } = payload;

      state.schedulerType = schedulerType;
    },
    addRound(state, { payload }: PayloadAction<{ players: Player[] }>) {
      const { players } = payload;

      if (!state.schedulerType) return;

      const roundID = ++state.currentRoundNum;

      const scheduler = getSchedulerByType(state.schedulerType);
      const newRound = scheduler.makeRound(
        players,
        Object.values(state.rounds),
        roundID
      );

      state.rounds = {
        ...state.rounds,
        ...newRound.reduce((acc, match) => {
          acc[match.ID] = match;
          return acc;
        }, {} as Record<string, Match>)
      };
    },
    readdRound(state, { payload }: PayloadAction<{ players: Player[] }>) {
      const { players } = payload;

      if (!state.schedulerType) return;

      const roundID = state.currentRoundNum;
      const roundsWithoutCurrent = Object.values(state.rounds).filter(round => round.roundID !== roundID);

      const scheduler = getSchedulerByType(state.schedulerType);
      const newRound = scheduler.makeRound(
        players,
        Object.values(state.rounds),
        roundID
      );

      console.log(newRound)

      state.rounds =
        [...roundsWithoutCurrent, ...newRound].reduce((acc, match) => {
          acc[match.ID] = match;
          return acc;
        }, {} as Record<string, Match>)
    },
    updateMatch(state, { payload }: PayloadAction<{ matchToUpdate: Match }>) {
      const { matchToUpdate } = payload;

      state.rounds[matchToUpdate.ID] = matchToUpdate;
    },
    resetRounds() {
      return initialState;
    }
  }
});


/**
 * Selectors
 */

export const selectSchedulerType = (state: RootState) =>
  state.rounds.schedulerType;

export const selectRoundsListAsArray = (state: RootState) =>
  Object.values(state.rounds.rounds);

export const selectRankedPlayers = (state: RootState) =>
  getRanking(selectPlayersListAsArray(state), selectRoundsListAsArray(state));

export const selectCurrentRound = (state: RootState): Match[] =>
  selectRoundsListAsArray(state).filter(
    match => match.roundID === state.rounds.currentRoundNum && !match.hasBye
  );
export const selectCurrentRoundNumber = (state: RootState): number =>
  state.rounds.currentRoundNum;

export const selectIsRoundCompleted = (state: RootState): boolean =>
  selectCurrentRound(state).every(({ result }) => result[0] !== result[1]);

export const {
  setSchedulerType,
  addRound,
  readdRound,
  updateMatch,
  resetRounds
} = roundsSlice.actions;
export default roundsSlice.reducer;
