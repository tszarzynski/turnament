/**
 * Returns number of rounds necessary to finish tournament
 * @param numPlayers
 */
export function roundsNeeded(numPlayers: number) {
  return (
    Math.ceil(Math.log2(numPlayers)) +
    Math.ceil(Math.log2(Math.log2(numPlayers)))
  );
}

/**
 * Returns minimum number of matches necessary to finish tournament
 * @param numPlayers
 */
export function matchesNeeded(numPlayers: number) {
  return numPlayers * 2 - 2;
}
