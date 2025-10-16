import type { DataConnection } from "peerjs";
import type { StateCreator } from "zustand";
import { useBaseStore, type RootState } from "../../app/store";
import { P2PPublisher } from "./peerClient";
import { getRanking } from "turnament-scheduler";

interface State {
	peerID: string | null;
}

type Actions = {
	initializePeer(): void;
	publish(): void;
};

export type PeerSlice = State & Actions;

const initialState: State = {
	peerID: null,
};

export const createPeerSlice: StateCreator<
	RootState,
	[["zustand/immer", never]],
	[],
	PeerSlice
> = (set, get) => ({
	...initialState,
	async initializePeer() {
		const prevPeerID = get().peerID;

		const peerID = await P2PPublisher.initializePeer(prevPeerID);
		P2PPublisher.peer?.on("connection", (connection) => {
			console.log("Peer connected: ", connection.peer);
			get().publish();

			useBaseStore.subscribe(
				(state) => state.matches,
				(state) => P2PPublisher.publish(state),
			);
		});

		set((state) => {
			state.peerID = peerID;
		});
	},
	publish() {
		const players = get().players;
		const matches = get().matches;
		const ranking = getRanking(players, matches);
		console.log("Publishing");
		P2PPublisher.publish(ranking);
	},
});
