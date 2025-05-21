import { pipeline } from "ts-pipe-compose";
import { filterActivePlayers, makePlayersWithResults } from "../../players";
import { makeRound } from "../../round";
import type { Eliminator, Match, Player, Scheduler } from "../../types";
import { calcNumRoundsFromResults } from "../../utils";
import { pairPlayers } from "./pair";
import { roundsNeeded } from "./rounds";

export const scheduler: Scheduler & Eliminator = {
	name: "Elimination",
	type: "ELIMINATION",
	makeRound: (players: Player[], results: Match[], roundID: number) => {
		return makeRound(
			pipeline(
				makePlayersWithResults,
				filterActivePlayers, // filter out inactive players
				pairPlayers(calcNumRoundsFromResults(results)),
			)(players, results),
			roundID,
		);
	},
	roundsNeeded,
	eliminate: (players: Player[], results: Match[]) => {
		const playersWithResults = makePlayersWithResults(players, results);
		// filter out inactive players
		const playerToEliminate = playersWithResults.filter(
			(player) => player.active,
		);

		return playerToEliminate.filter((player) => player.matchesLost > 1);
	},
};
