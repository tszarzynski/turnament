import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "turnament-scheduler";
import { RootState } from "../../app/reducers";
import { AppThunk } from "../../app/store";
import { readdRound } from "../round/roundsSlice";

interface PlayersState {
  players: Record<number, Player>;
  nextPlayerID: number;
}

let initialState: PlayersState = {
  players: {},
  nextPlayerID: 0
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer(state, { payload }: PayloadAction<{ name: string }>) {
      const { name } = payload;
      const ID = ++state.nextPlayerID;
      state.players[ID] = {
        ID,
        name,
        active: true
      };
    },
    removePlayer(state, { payload }: PayloadAction<{ playerID: number }>) {
      const { playerID } = payload;

      delete state.players[playerID];
    },
    deactivatePlayer(state, { payload }: PayloadAction<{ playerID: number }>) {
      const { playerID } = payload;

      state.players[playerID].active = false;
    },
    resetPlayers() {
      return initialState;
    }
  }
});

/**
 * Thunks
 */

export const disablePlayer = ({ playerID }: { playerID: number }): AppThunk => (
  dispatch,
  getState
) => {
  dispatch(deactivatePlayer({ playerID }));
  const players = selectPlayersListAsArray(getState());
  dispatch(readdRound({ players }));
};

/**
 * Selectors
 */

export const selectPlayersListAsArray = (state: RootState) =>
  Object.values(state.players.players);

export const {
  addPlayer,
  removePlayer,
  deactivatePlayer,
  resetPlayers
} = playersSlice.actions;
export default playersSlice.reducer;
