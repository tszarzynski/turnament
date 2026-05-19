import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createPeerSlice, type PeerSlice } from "../features/peer/peerSlice";
import {
	createPlayerSlice,
	type PlayersSlice,
} from "../features/players/playersSlice";
import {
	createRoundsSlice,
	type RoundsSlice,
} from "../features/round/roundsSlice";

export type RootState = PlayersSlice & RoundsSlice & PeerSlice;

export const useBaseStore = create<RootState>()(
	subscribeWithSelector(
		persist(
			immer((...args) => ({
				...createPlayerSlice(...args),
				...createRoundsSlice(...args),
				...createPeerSlice(...args),
			})),
			{
				name: "turnament-store",
				partialize: (state) => {
					const {
						peerID: _p,
						peerError: _e,
						initializePeer: _i,
						publish: _pub,
						destroyPeer: _d,
						...rest
					} = state;
					return rest;
				},
			},
		),
	),
);

useBaseStore.subscribe(
	(state) => state.matches,
	() => {
		if (useBaseStore.getState().peerID) useBaseStore.getState().publish();
	},
);
