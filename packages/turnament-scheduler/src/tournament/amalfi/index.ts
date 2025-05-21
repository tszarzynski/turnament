import { pipeline } from "ts-pipe-compose";
import {
	filterActivePlayers,
	makePlayersWithResults,
	makePlayersWithStats,
} from "../../players";
import { makeRound } from "../../round";
import type { Match, Player, Scheduler } from "../../types";
import { pairPlayers } from "./pair";
import { roundsNeeded } from "./rounds";

export const scheduler: Scheduler = {
	name: "Amalfi",
	type: "AMALFI",
	makeRound: (players: Player[], results: Match[], roundID: number) => {
		return makeRound(
			pipeline(
				makePlayersWithResults,
				makePlayersWithStats,
				filterActivePlayers, // filter out inactive players
				pairPlayers,
			)(players, results),
			roundID,
		);
	},
	roundsNeeded: roundsNeeded(1),
};
