/**
 * Return the minimum number of rounds to be played to determine a winner.
 * @param numPlayers Number of players
 * @param numStandings Number of standings to determine
 */
export const roundsNeeded =
	(numStandings: number) =>
	(numPlayers: number): number =>
		Math.ceil(Math.log2(numPlayers) + Math.log2(numStandings));
