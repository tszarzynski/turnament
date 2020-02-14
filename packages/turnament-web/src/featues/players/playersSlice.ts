import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "turnament-scheduler";
import { RootState } from "../../app/reducers";

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

export const selectPlayersListAsArray = (state: RootState) =>
  Object.values(state.players.players);

export const {
  addPlayer,
  removePlayer,
  deactivatePlayer,
  resetPlayers
} = playersSlice.actions;
export default playersSlice.reducer;
