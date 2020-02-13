import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Match, SwissTournament, getRanking, Player } from "turnament-scheduler";
import { RootState } from "../../app/reducers";

export type State = {
  rounds: Match[];
  currentRound: number;
};
let initialState: State = {
  rounds: [],
  currentRound: 0
};

const roundsSlice = createSlice({
  name: "rounds",
  initialState,
  reducers: {
    addRound(state, { payload }: PayloadAction<{ players: Player[] }>) {
      const { players } = payload;

      const roundID = ++state.currentRound;
     
      state.rounds = state.rounds.concat(SwissTournament.makeRound(players, state.rounds, roundID));
    },
    updateMatch(state, { payload }: PayloadAction<{ matchToUpdate: Match }>) {
      const { matchToUpdate } = payload;

      state.rounds = state.rounds.map(match => {
        if (match.ID === matchToUpdate.ID) {
          return matchToUpdate;
        }
        return match;
      });
    },
    reset() {
      return initialState;
    }
  }
});

export const selectRankedPlayers = (state: RootState) =>
  getRanking(state.players, state.rounds.rounds);

export const selectCurrentRound = (state: RootState): Match[] =>
  state.rounds.rounds.filter(
    match => match.roundID === state.rounds.currentRound && !match.hasBye
  );

export const selectCurrentRoundNumber = (state: RootState): number =>
  state.rounds.currentRound;

export const { addRound, updateMatch } = roundsSlice.actions;
export default roundsSlice.reducer;
