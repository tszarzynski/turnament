import { PlayerWithResults } from "./types";

/**
 * Check if players played each other
 * @param player
 */
const isOpponent = (player: PlayerWithResults) => (possibleOpponent: PlayerWithResults) =>
  possibleOpponent.opponents.includes(player.ID);

/**
 * Return the list of player's opponents
 * @param allPlayers list of all players
 * @param player
 */
const listPlayerOpponents = (allPlayers: PlayerWithResults[], player: PlayerWithResults) =>
  allPlayers.filter(isOpponent(player));

/**
 * Return win/lose ratio
 * @param opponent
 */
const calcWinLoseRatio = (player: PlayerWithResults) =>
  player.matchesWon / (player.matchesWon + player.matchesLost);

/**
 * Calculate OMV for a given player
 * @param allPlayers list of all players
 * @param player player to calculate OMV for
 */
export const calcOMV = (allPlayers: PlayerWithResults[], player: PlayerWithResults) =>
  listPlayerOpponents(allPlayers, player).reduce(
    (avg, opponent, _, arr) => avg + calcWinLoseRatio(opponent) / arr.length,
    0
  );