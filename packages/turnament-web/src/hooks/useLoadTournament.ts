import { routes } from "../app/router";
import { useBaseStore } from "../app/store";
import type { SavedState } from "../features/round/roundsSlice";

export function useLoadTournament() {
	return () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "application/json";
		input.onchange = (e) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (!file) return;
			const reader = new FileReader();
			reader.onload = (ev) => {
				try {
					const data = JSON.parse(ev.target?.result as string) as SavedState;
					useBaseStore.getState().restoreState(data);
					routes.rounds().push();
				} catch {
					alert("Invalid tournament file.");
				}
			};
			reader.readAsText(file);
		};
		input.click();
	};
}
