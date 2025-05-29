import { BYE_ID } from "../../consts";
import { rankPlayers } from "../../rank";
import type { Pairing, PlayerWithStats } from "../../types";
import { isOdd } from "../../utils";
import { roundsNeeded } from "./rounds";

/**
 * Folds array into pairs
 */
export const toPairs = (arr: number[], offset: number): Pairing[] => {
	let arrToFold: number[];
	let bye = null;

	if (isOdd(arr.length)) {
		bye = arr[0];
		arrToFold = arr.slice(1);
	} else {
		arrToFold = arr;
	}

	// Cap the offset to array length - 1
	const safeOffset = Math.min(offset, arrToFold.length - 1);

	const pairs: Pairing[] = [];
	for (let i = 0; i < arrToFold.length - safeOffset; i++) {
		pairs.push([arrToFold[i], arrToFold[i + safeOffset]]);
	}

	return bye ? [[bye, BYE_ID], ...pairs] : pairs;
};

export const pairPlayers = (players: PlayerWithStats[]): Pairing[] => {
	const numPlayedRounds = Math.min(
		...players.map((players) => players.opponents.length),
	);

	const numRounds = roundsNeeded(players.length);

	return toPairs(
		rankPlayers(players).map((player) => player.ID),
		numRounds - numPlayedRounds,
	);
};
