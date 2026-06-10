import type { Match, Player, SchedulerType } from "turnament-scheduler";
import { asc, desc, makePlayersWithResults, sortWith } from "turnament-scheduler";
import { calcBuchholzCut1 } from "./buchholz";
import { calcNPS } from "./nps";
import { calcOMV } from "./omv";
import { calcSonnebornBerger } from "./sonnebornBerger";
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
		sonnebornBerger: calcSonnebornBerger(players, player, matches, scoringDivisor),
	}));

// Swiss + Amalfi: Buchholz Cut-1 is meaningful (varied opponents per bracket path)
const rankChessSwissPlayers = (players: PlayerWithStats[]): PlayerWithStats[] =>
	sortWith<PlayerWithStats>([
		desc("gamesWon"),
		desc("buchholzCut1"),
		desc("matchesWon"),
	])(players);

// Round Robin: Buchholz is a constant for tied players (everyone plays everyone),
// so Sonneborn-Berger is used instead — it weights by result against each opponent
const rankChessRoundRobinPlayers = (players: PlayerWithStats[]): PlayerWithStats[] =>
	sortWith<PlayerWithStats>([
		desc("gamesWon"),
		desc("sonnebornBerger"),
		desc("matchesWon"),
	])(players);

// Elimination: bracket position drives ranking — most wins, fewest losses, then score
const rankEliminationPlayers = (players: PlayerWithStats[]): PlayerWithStats[] =>
	sortWith<PlayerWithStats>([
		desc("matchesWon"),
		asc("matchesLost"),
		desc("gamesWon"),
	])(players);

// Swiss + Amalfi + Round Robin backgammon: match wins primary, NPS as tiebreaker
const rankBackgammonSwissPlayers = (players: PlayerWithStats[]): PlayerWithStats[] =>
	sortWith<PlayerWithStats>([
		desc("matchesWon"),
		desc("nps"),
		desc("gamesWon"),
	])(players);

export const rankPlayers = (
	players: PlayerWithStats[],
	sportType?: SportType,
	schedulerType?: SchedulerType,
): PlayerWithStats[] => {
	if (schedulerType === "ELIMINATION") return rankEliminationPlayers(players);
	if (sportType === "CHESS") {
		return schedulerType === "ROUND_ROBIN"
			? rankChessRoundRobinPlayers(players)
			: rankChessSwissPlayers(players);
	}
	return rankBackgammonSwissPlayers(players);
};

export const getRanking = (
	players: Player[],
	results: Match[],
	sportType?: SportType,
	scoringDivisor = 1,
	schedulerType?: SchedulerType,
): PlayerWithStats[] => {
	const playersWithResults = makePlayersWithResults(players, results);
	const playersWithStats = makePlayersWithStats(
		playersWithResults,
		results,
		scoringDivisor,
	);
	return rankPlayers(playersWithStats, sportType, schedulerType);
};
