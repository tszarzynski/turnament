import { pipeline } from "ts-pipe-compose";
import { BYE_ID } from "./consts";
import { rankPlayers } from "./rank";
import { asc, desc, sortWith } from "./sort";
import type {
	PlayerID,
	PlayerWithBye,
	PlayerWithResults,
	PlayerWithStats,
} from "./types";
import { first, isOdd, last, prop } from "./utils";

const countByes = (opponents: number[]) =>
	opponents.filter((id) => id === BYE_ID).length;
const playersWithByes = (players: PlayerWithResults[]) =>
	players.map((player) => ({ ...player, bye: countByes(player.opponents) }));

/**
 * Check if we need to grant 'bye' to a player and return nominated player ID. Otherwise return -1.
 * @param players list of players
 */
export const nominateWeakestPlayerForBye = (
	players: PlayerWithStats[],
): PlayerID =>
	isOdd(players.length)
		? pipeline(
				rankPlayers,
				playersWithByes,
				sortWith<PlayerWithBye>([desc("bye")]),
				last,
				prop("ID"),
			)(players)
		: BYE_ID;

/**
 * Check if we need to grant 'bye' to a player and return nominated player ID. Otherwise return -1.
 * @param players list of players
 */
export const nominateStrongestPlayerForBye = (
	players: PlayerWithStats[],
): PlayerID =>
	isOdd(players.length)
		? pipeline(
				rankPlayers,
				playersWithByes,
				sortWith<PlayerWithBye>([asc("bye")]),
				first,
				prop("ID"),
			)(players)
		: BYE_ID;
