/**
 * Returns number of rounds necessary to finish tournament
 * @param numPlayers 
 */
export function roundsNeeded(numPlayers: number) {
  return (numPlayers * (numPlayers - 1)) / 2;
}
