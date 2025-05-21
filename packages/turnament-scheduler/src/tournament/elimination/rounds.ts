/**
 * Returns number of rounds necessary to finish tournament
 */
export const roundsNeeded = (numPlayers: number): number =>
	Math.ceil(Math.log2(numPlayers)) +
	Math.ceil(Math.log2(Math.log2(numPlayers)));

/**
 * Returns minimum number of matches necessary to finish tournament
 */
export const matchesNeeded = (numPlayers: number): number => numPlayers * 2 - 2;
