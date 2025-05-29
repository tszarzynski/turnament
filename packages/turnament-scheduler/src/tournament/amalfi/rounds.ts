/**
 * Return the minimum number of rounds to be played to determine winner
 * @param numPlayers Number of players
 * @param numStandings Number of standings to determine
 */
export const roundsNeeded = (numPlayers: number): number =>
	Math.ceil(Math.log2(numPlayers) + 1);
