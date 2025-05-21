import { BYE_ID } from "../../consts";
import type { Pairing, Player } from "../../types";
import { isOdd } from "../../utils";

/**
 * Shift players
 */
export const shiftArray = <T>(arr: T[], offset: number): T[] => {
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
 * Folds array into pairs of opposite elements. Ignores middle element if array has odd length.
 */
export const toPairs = (arr: number[]): Pairing[] => {
	// determine the middle of the array
	const half = Math.floor(arr.length / 2);
	const firstHalf = arr.slice(0, half);
	const secondHalf = arr.slice(half).reverse();

	// fold intro pairs
	return firstHalf.map((id, idx) => [id, secondHalf[idx]]);
};

export const pairPlayers =
	(numRoundsPlayed: number) =>
	(players: Player[]): Pairing[] => {
		const playersToPair = players.map((player) => player.ID);

		// add dummy BYE player if number of players is odd
		if (isOdd(playersToPair.length)) {
			playersToPair.push(BYE_ID);
		}

		// shifts elements to create new order for next round pairings
		const shifted = shiftArray(playersToPair, numRoundsPlayed);

		const pairings = toPairs(shifted);

		return pairings;
	};
