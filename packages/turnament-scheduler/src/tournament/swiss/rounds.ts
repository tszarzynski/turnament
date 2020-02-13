/**
 * Return the minimum number of rounds to be played to determine winner
 * @param numPlayers Number of players
 * @param numStandings Number of standings to determine
 */
export function roundsNeeded(numStandings: number) {
  return (numPlayers: number) =>  Math.ceil(Math.log2(numPlayers) + Math.log2(numStandings));
}
