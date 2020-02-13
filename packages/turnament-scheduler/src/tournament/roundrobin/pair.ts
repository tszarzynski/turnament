import { PlayerWithResults, Pairing, Match } from "../../types";
import { BYE_ID } from "../../consts";

/**
 * Shift players
 */
export const shiftArray = <T>(arr: T[], offset: number) => {
  // get first array element
  const firstElement = arr.slice(0, 1);
  // get remaining array elements
  const remainingElements = arr.slice(1);
  // shift remaining elements by given offset
  const shiftedElements = remainingElements
    .slice(-offset)
    .concat(remainingElements.slice(0, -offset));

  return [...firstElement, ...shiftedElements];
};

/**
 * Folds array into pairs
 */
export const toPairs = (arr: number[]): Pairing[] => {
  // determine the middle of the array
  const half = Math.ceil(arr.length / 2);
  const firstHalf = arr.slice(0, half);
  const secondHalf = arr.slice(half).reverse();

  // fold intro pairs
  return firstHalf.map((id, idx) => [id, secondHalf[idx] || BYE_ID]);
};

export function pairPlayers(players: PlayerWithResults[]) {
  const shiftBy = Math.min(...players.map(players => players.opponents.length));
  const shifted = shiftArray(
    players.map(player => player.ID),
    shiftBy
  );
  return toPairs(shifted);
}
