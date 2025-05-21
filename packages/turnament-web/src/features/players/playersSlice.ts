import type { Player } from "turnament-scheduler";
import type { StateCreator } from "zustand";
import type { RoundsSlice } from "../round/roundsSlice";

interface State {
	players: Player[];
	nextPlayerID: number;
}

interface Actions {
	addPlayer: (player: Pick<Player, "name">) => void;
	addPlayers: (players: Pick<Player, "name">[]) => void;
	removePlayer: (player: Pick<Player, "ID">) => void;
	deactivatePlayer: (player: Pick<Player, "ID">) => void;
	disablePlayer: (player: Pick<Player, "ID">) => void;
	resetPlayers: () => void;
}

export type PlayersSlice = State & Actions;

const initialState: State = {
	players: [],
	nextPlayerID: 0,
};

export const createPlayerSlice: StateCreator<
	PlayersSlice & RoundsSlice,
	[["zustand/immer", never]],
	[],
	PlayersSlice
> = (set, get) => ({
	...initialState,
	addPlayer(player) {
		const { name } = player;
		const ID = ++get().nextPlayerID;
		set((state) => {
			state.players.push({
				ID,
				name,
				active: true,
			});
		});
	},
	addPlayers(players) {
		set((state) => {
			state.players.push(
				...players.map(({ name }) => ({
					ID: ++get().nextPlayerID,
					name,
					active: true,
				})),
			);
		});
	},
	removePlayer(player) {
		const { ID } = player;

		set((state) => {
			const index = state.players.findIndex((player) => player.ID === ID);
			if (index !== -1) state.players.splice(index, 1);
		});
	},
	deactivatePlayer(player) {
		const { ID } = player;

		set((state) => {
			const index = state.players.findIndex((player) => player.ID === ID);
			if (index !== -1) state.players[index].active = false;
		});
	},
	disablePlayer(player) {
		get().deactivatePlayer(player);
		get().readdRound(get().players);
	},
	resetPlayers() {
		set(initialState);
	},
});
