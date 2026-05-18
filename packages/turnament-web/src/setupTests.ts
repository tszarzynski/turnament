import { useBaseStore } from "./app/store";

beforeEach(() => {
	localStorage.clear();
	useBaseStore.getState().resetPlayers();
	useBaseStore.getState().resetRounds();
});
