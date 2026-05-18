import { pipeline } from "ts-pipe-compose";
import { BYE_ID } from "./consts";
import { asc, desc, sortWith } from "./sort";
import type {
	PlayerID,
	PlayerWithBye,
	PlayerWithResults,
} from "./types";
import { first, isOdd, last, prop } from "./utils";

const countByes = (opponents: number[]) =>
	opponents.filter((id) => id === BYE_ID).length;

const playersWithByes = (players: PlayerWithResults[]) =>
	players.map((player) => ({ ...player, bye: countByes(player.opponents) }));

const sortByStanding = sortWith<PlayerWithResults>([
	desc("matchesWon"),
	desc("gamesWon"),
]);

/**
 * Nominate the weakest active player for a bye.
 * Weakest = lowest standing; among equally weak, prefer fewest prior byes.
 */
export const nominateWeakestPlayerForBye = (
	players: PlayerWithResults[],
): PlayerID =>
	isOdd(players.length)
		? pipeline(
				sortByStanding,
				playersWithByes,
				sortWith<PlayerWithBye>([desc("bye")]),
				last,
				prop("ID"),
			)(players)
		: BYE_ID;

/**
 * Nominate the strongest active player for a bye.
 * Strongest = highest standing; among equally strong, prefer fewest prior byes.
 */
export const nominateStrongestPlayerForBye = (
	players: PlayerWithResults[],
): PlayerID =>
	isOdd(players.length)
		? pipeline(
				sortByStanding,
				playersWithByes,
				sortWith<PlayerWithBye>([asc("bye")]),
				first,
				prop("ID"),
			)(players)
		: BYE_ID;
