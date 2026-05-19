import { getRanking } from "turnament-ranking";
import type { StateCreator } from "zustand";
import type { RootState } from "../../app/store";
import { P2PPublisher } from "./peerClient";

interface State {
	peerID: string | null;
	peerError: string | null;
}

type Actions = {
	initializePeer(): void;
	publish(): void;
	destroyPeer(): void;
};

export type PeerSlice = State & Actions;

const initialState: State = {
	peerID: null,
	peerError: null,
};

export const createPeerSlice: StateCreator<
	RootState,
	[["zustand/immer", never]],
	[],
	PeerSlice
> = (set, get) => ({
	...initialState,
	async initializePeer() {
		if (get().peerID) return;

		try {
			const peerID = await P2PPublisher.initializePeer(null, () => {
				get().publish();
			});
			set((state) => {
				state.peerID = peerID;
				state.peerError = null;
			});
		} catch {
			set((state) => {
				state.peerError = "Could not connect to signalling server.";
			});
		}
	},
	publish() {
		const { players, matches, sportType, scoringDivisor } = get();
		const ranking = getRanking(
			players,
			matches,
			sportType ?? undefined,
			scoringDivisor,
		);
		P2PPublisher.publish({
			ranking,
			sportType: sportType ?? null,
			scoringDivisor,
		});
	},
	destroyPeer() {
		set((state) => {
			state.peerID = null;
			state.peerError = null;
		});
	},
});
