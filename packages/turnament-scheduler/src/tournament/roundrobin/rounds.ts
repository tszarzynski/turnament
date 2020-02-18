import { isEven } from "../../utils";

/**
 * Returns number of rounds necessary to finish tournament
 * @param numPlayers
 */
export function roundsNeeded(numPlayers: number) {
  if (isEven(numPlayers)) {
    return numPlayers - 1
  } else {
    return numPlayers
  }
}

/**
 * Returns number of matches necessary to finish tournament
 * @param numPlayers
 */
export function matchesNeeded(numPlayers: number) {
  return (numPlayers * (numPlayers - 1)) / 2;
}
