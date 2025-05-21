import { pipeline } from "ts-pipe-compose";
import { nominateWeakestPlayerForBye } from "../../bye";
import { BYE_ID } from "../../consts";
import type { Pairing, PlayerWithStats } from "../../types";
import { makeWeightedGraph } from "./graph";
import { calcMWMForGraph, transformMWMToPairings } from "./mwm";

export const pairPlayers = (players: PlayerWithStats[]): Pairing[] => {
	// check if we have a player with BYE nomination
	const nominatedID = nominateWeakestPlayerForBye(players);
	// remove nominated player from the list
	const playersToPair = players.filter((p) => p.ID !== nominatedID);

	const pairings = pipeline(
		makeWeightedGraph,
		calcMWMForGraph,
		transformMWMToPairings(playersToPair),
	)(playersToPair);

	return nominatedID !== BYE_ID
		? [...pairings, [nominatedID, BYE_ID] as Pairing]
		: pairings;
};
