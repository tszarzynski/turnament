import { pipeline } from "ts-pipe-compose";
import { filterActivePlayers } from "../../players";
import { makeRound } from "../../round";
import type { Match, Player, Scheduler } from "../../types";
import { calcNumRoundsFromResults } from "../../utils";
import { pairPlayers } from "./pair";
import { roundsNeeded } from "./rounds";

export const scheduler: Scheduler = {
	name: "Round Robin",
	type: "ROUND_ROBIN",
	makeRound: (players: Player[], results: Match[], roundID: number) => {
		return makeRound(
			pipeline(
				filterActivePlayers, // filter out inactive players
				pairPlayers(calcNumRoundsFromResults(results)),
			)(players),
			roundID,
		);
	},
	roundsNeeded,
};
