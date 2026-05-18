import { BYE_ID } from "turnament-scheduler";
import type { PlayerWithResults } from "turnament-scheduler";

/**
 * Calculate Buchholz Cut-1 for a given player.
 * BH-C1 = sum of all opponents' match wins, excluding byes, minus the single lowest opponent score.
 * FIDE standard tiebreaker for Swiss chess tournaments.
 */
export const calcBuchholzCut1 = (
	allPlayers: PlayerWithResults[],
	player: PlayerWithResults,
): number => {
	const opponentScores = player.opponents
		.filter((id) => id !== BYE_ID)
		.map((id) => allPlayers.find((p) => p.ID === id)?.matchesWon ?? 0);

	if (opponentScores.length === 0) return 0;

	const min = Math.min(...opponentScores);
	const firstMinIdx = opponentScores.indexOf(min);
	const trimmed = [
		...opponentScores.slice(0, firstMinIdx),
		...opponentScores.slice(firstMinIdx + 1),
	];
	return trimmed.reduce((sum, s) => sum + s, 0);
};
