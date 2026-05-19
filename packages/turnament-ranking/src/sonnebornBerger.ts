import type { Match, PlayerWithResults } from "turnament-scheduler";

/**
 * Calculate Sonneborn-Berger score for a given player.
 * SB = Σ (opponent's final gamesWon × result factor) for each non-bye match
 * where result factor: win=1.0, draw=0.5, loss=0.0
 *
 * FIDE standard tiebreaker for round-robin chess tournaments.
 * Unlike Buchholz (which sums raw opponent scores regardless of your result),
 * SB weights by your individual result against each opponent — beating a
 * stronger opponent is worth more than drawing against them.
 *
 * Note: chess scores are stored as doubled integers (win=2, draw=1, loss=0).
 * Dividing by scoringDivisor (2 for chess) converts the raw result to the
 * standard 1.0/0.5/0.0 factor.
 */
export const calcSonnebornBerger = (
	allPlayers: PlayerWithResults[],
	player: PlayerWithResults,
	matches: Match[],
	scoringDivisor = 1,
): number =>
	matches
		.filter((m) => !m.hasBye && m.pairing.includes(player.ID))
		.reduce((sum, match) => {
			const idxPlayer = match.pairing.indexOf(player.ID);
			const opponentID = match.pairing[1 - idxPlayer];
			const opponent = allPlayers.find((p) => p.ID === opponentID);
			if (!opponent) return sum;
			const resultFactor = match.result[idxPlayer] / scoringDivisor;
			return sum + opponent.gamesWon * resultFactor;
		}, 0);
