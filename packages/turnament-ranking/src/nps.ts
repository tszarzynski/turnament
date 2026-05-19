import type { Match, PlayerWithResults } from "turnament-scheduler";

/**
 * Calculate Net Point Spread for a given player.
 * NPS = (total points scored - total points conceded) / scoringDivisor, excluding bye matches.
 * Used as a tiebreaker in Swiss backgammon tournaments.
 * scoringDivisor normalises chess doubled-integer encoding (default 1 for backgammon).
 */
export const calcNPS = (
	player: PlayerWithResults,
	matches: Match[],
	scoringDivisor = 1,
): number =>
	matches
		.filter((m) => !m.hasBye && m.pairing.includes(player.ID))
		.reduce((spread, match) => {
			const idx = match.pairing.indexOf(player.ID);
			return (
				spread + (match.result[idx] - match.result[1 - idx]) / scoringDivisor
			);
		}, 0);
