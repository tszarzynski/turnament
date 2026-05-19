import { pipeline } from "ts-pipe-compose";
import { filterActivePlayers, makePlayersWithResults } from "../../players";
import { makeRound } from "../../round";
import type { Match, Player, Scheduler } from "../../types";
import { pairPlayers } from "./pair";
import { roundsNeeded } from "./rounds";

export const scheduler: Scheduler = {
	name: "Swiss",
	type: "SWISS",
	makeRound: (players: Player[], results: Match[], roundID: number) => {
		return makeRound(
			pipeline(
				makePlayersWithResults,
				filterActivePlayers,
				pairPlayers,
			)(players, results),
			roundID,
		);
	},
	roundsNeeded: roundsNeeded(1),
};
