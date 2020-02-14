import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Match,
  SwissTournament,
  getRanking,
  Player
} from "turnament-scheduler";
import { RootState } from "../../app/reducers";
import { selectPlayersListAsArray } from "../players/playersSlice";

interface RoundsState {
  rounds: Record<string, Match>;
  currentRound: number;
}

let initialState: RoundsState = {
  rounds: {},
  currentRound: 0
};

const roundsSlice = createSlice({
  name: "rounds",
  initialState,
  reducers: {
    addRound(state, { payload }: PayloadAction<{ players: Player[] }>) {
      const { players } = payload;

      const roundID = ++state.currentRound;

      const newRound = SwissTournament.makeRound(
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
    updateMatch(state, { payload }: PayloadAction<{ matchToUpdate: Match }>) {
      const { matchToUpdate } = payload;

      state.rounds[matchToUpdate.ID] = matchToUpdate;
    },
    resetRounds() {
      return initialState;
    }
  }
});

export const selectRoundsListAsArray = (state: RootState) =>
  Object.values(state.rounds.rounds);

export const selectRankedPlayers = (state: RootState) =>
  getRanking(selectPlayersListAsArray(state), selectRoundsListAsArray(state));

export const selectCurrentRound = (state: RootState): Match[] =>
  selectRoundsListAsArray(state).filter(
    match => match.roundID === state.rounds.currentRound && !match.hasBye
  );
export const selectCurrentRoundNumber = (state: RootState): number =>
  state.rounds.currentRound;

export const selectIsRoundCompleted = (state: RootState): boolean =>
  selectCurrentRound(state).every(({ result }) => result[0] !== result[1]);

export const { addRound, updateMatch, resetRounds } = roundsSlice.actions;
export default roundsSlice.reducer;
