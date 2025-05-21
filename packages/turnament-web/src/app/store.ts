import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
	type PlayersSlice,
	createPlayerSlice,
} from "../features/players/playersSlice";
import {
	type RoundsSlice,
	createRoundsSlice,
} from "../features/round/roundsSlice";

export type RootState = PlayersSlice & RoundsSlice;

export const useBaseStore = create<RootState>()(
	persist(
		immer((...args) => ({
			...createPlayerSlice(...args),
			...createRoundsSlice(...args),
		})),
		{
			name: "turnament-store",
		},
	),
);
