import type { PlayerWithResults } from "turnament-scheduler";

const isOpponent =
	(player: PlayerWithResults) => (possibleOpponent: PlayerWithResults) =>
		possibleOpponent.opponents.includes(player.ID);

const listPlayerOpponents = (
	allPlayers: PlayerWithResults[],
	player: PlayerWithResults,
) => allPlayers.filter(isOpponent(player));

const calcWinLoseRatio = (player: PlayerWithResults) =>
	player.matchesWon / (player.matchesWon + player.matchesLost);

/**
 * Calculate OMV (Opponent Match Value) for a given player.
 * OMV = average win/loss ratio of all opponents faced, excluding byes.
 */
export const calcOMV = (
	allPlayers: PlayerWithResults[],
	player: PlayerWithResults,
): number =>
	listPlayerOpponents(allPlayers, player).reduce(
		(avg, opponent, _, arr) => avg + calcWinLoseRatio(opponent) / arr.length,
		0,
	);
