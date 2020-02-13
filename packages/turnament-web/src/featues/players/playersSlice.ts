import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from 'turnament-scheduler';


let initialState: Player[] = [];
// TODO: change that
let nextPlayerId = 0;

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: {
      reducer(state, { payload }: PayloadAction<{ name: string; ID: number }>) {
        const { ID, name } = payload;
        state.push({
          ID,
          name
        });
      },
      prepare(name: string) {
        return { payload: { name, ID: ++nextPlayerId } };
      }
    },
    removePlayer(state, { payload }: PayloadAction<{ playerID: number }>) {
      const { playerID } = payload;

      return state.filter(player => player.ID !== playerID);
    },
    reset() {
      return initialState;
    }
  }
});

export const { addPlayer, removePlayer, reset } = playersSlice.actions;
export default playersSlice.reducer;
