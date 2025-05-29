import { useMemo } from "react";
import { BYE_ID, type Match, type Player } from "turnament-scheduler";

export default function usePlayerNames(players: Player[], matches: Match[]) {
	if (!players || players.length === 0) {
		throw new Error("Players array cannot be empty");
	}

	if (!matches) {
		throw new Error("Matches array cannot be null");
	}

	const names = useMemo(() => {
		const getPlayer = (pr: number) => players.find((p) => p.ID === pr);

		return matches.map(({ pairing }): [string, string] => {
			const p1 = getPlayer(pairing[0]);
			const p2 = getPlayer(pairing[1]);

			return [
				pairing[0] !== BYE_ID && p1 ? p1.name : "BYE",
				pairing[1] !== BYE_ID && p2 ? p2.name : "BYE",
			];
		});
	}, [matches, players]);

	return names;
}
