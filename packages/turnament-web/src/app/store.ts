import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
	type PlayersSlice,
	createPlayerSlice,
} from "../features/players/playersSlice";
import {
	type RoundsSlice,
	createRoundsSlice,
} from "../features/round/roundsSlice";
import { P2PPublisher } from "../features/peer/peerClient";
import { createPeerSlice, type PeerSlice } from "../features/peer/peerSlice";

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
					const { peerID: _p, peerError: _e, initializePeer: _i, publish: _pub, destroyPeer: _d, ...rest } = state;
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
