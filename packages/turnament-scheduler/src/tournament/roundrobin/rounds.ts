import { isEven } from "../../utils";

/**
 * Returns number of rounds necessary to finish tournament
 */
export const roundsNeeded = (numPlayers: number): number =>
	isEven(numPlayers) ? numPlayers - 1 : numPlayers;

/**
 * Returns number of matches necessary to finish tournament
 */
export const matchesNeeded = (numPlayers: number): number =>
	(numPlayers * (numPlayers - 1)) / 2;
