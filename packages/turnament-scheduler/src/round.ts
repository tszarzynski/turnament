import { v1 as uuid } from "uuid";
import { BYE_ID } from "./consts";
import type { Match, Pairing, RoundID } from "./types";

export const makeMatch = (
	roundID: number,
	pairing: Pairing,
	ID: string = uuid(),
): Match => ({
	roundID,
	ID,
	pairing,
	result: [0, 0],
	hasBye: pairing.includes(BYE_ID),
});

export const makeRound = (pairings: Pairing[], roundID: RoundID): Match[] =>
	pairings.map((pairing) => makeMatch(roundID, pairing));
