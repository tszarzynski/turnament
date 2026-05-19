import { useBaseStore } from "../app/store";
import type { SavedState } from "../features/round/roundsSlice";

export function useSaveTournament() {
	return () => {
		const state = useBaseStore.getState();
		const data: SavedState = {
			players: state.players,
			nextPlayerID: state.nextPlayerID,
			schedulerType: state.schedulerType,
			sportType: state.sportType,
			scoringDivisor: state.scoringDivisor,
			matches: state.matches,
			currentRoundNum: state.currentRoundNum,
			minPointsToWin: state.minPointsToWin,
		};
		const blob = new Blob([JSON.stringify(data, null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `tournament-${new Date().toISOString().slice(0, 10)}.json`;
		a.click();
		URL.revokeObjectURL(url);
	};
}
