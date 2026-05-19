import type { Match, Player } from "turnament-scheduler";
import { desc, makePlayersWithResults, sortWith } from "turnament-scheduler";
import { calcBuchholzCut1 } from "./buchholz";
import { calcNPS } from "./nps";
import { calcOMV } from "./omv";
import type { PlayerWithStats, SportType } from "./types";

const makePlayersWithStats = (
	players: ReturnType<typeof makePlayersWithResults>,
	matches: Match[],
	scoringDivisor: number,
): PlayerWithStats[] =>
	players.map((player) => ({
		...player,
		omv: calcOMV(players, player),
		buchholzCut1: calcBuchholzCut1(players, player),
		nps: calcNPS(player, matches, scoringDivisor),
	}));

const rankBackgammonPlayers = (players: PlayerWithStats[]): PlayerWithStats[] =>
	sortWith<PlayerWithStats>([
		desc("matchesWon"),
		desc("nps"),
		desc("gamesWon"),
	])(players);

const rankChessPlayers = (players: PlayerWithStats[]): PlayerWithStats[] =>
	sortWith<PlayerWithStats>([
		desc("gamesWon"),
		desc("buchholzCut1"),
		desc("matchesWon"),
	])(players);

export const rankPlayers = (
	players: PlayerWithStats[],
	sportType?: SportType,
): PlayerWithStats[] =>
	sportType === "CHESS"
		? rankChessPlayers(players)
		: rankBackgammonPlayers(players);

export const getRanking = (
	players: Player[],
	results: Match[],
	sportType?: SportType,
	scoringDivisor = 1,
): PlayerWithStats[] => {
	const playersWithResults = makePlayersWithResults(players, results);
	const playersWithStats = makePlayersWithStats(
		playersWithResults,
		results,
		scoringDivisor,
	);
	return rankPlayers(playersWithStats, sportType);
};
