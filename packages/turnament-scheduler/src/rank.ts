import { compose } from "ts-pipe-compose";
import { makePlayersWithResults, makePlayersWithStats } from "./players";
import { desc, sortWith } from "./sort";
import type { Match, Player, PlayerWithStats } from "./types";

/**
 * Returns sorted list of players. Function tries to resolve tiebreaks by using 3 sorting criteria:
 * number of matches won, number of games won and OMV.
 * @param players list of players
 */
export const rankPlayers = (players: PlayerWithStats[]): PlayerWithStats[] =>
	sortWith<PlayerWithStats>([
		desc("matchesWon"),
		desc("gamesWon"),
		desc("omv"),
	])(players);

export const getRanking = (
	players: Player[],
	results: Match[],
): PlayerWithStats[] =>
	compose(
		rankPlayers,
		makePlayersWithStats,
		makePlayersWithResults,
	)(players, results);
