import uuid from "uuid/v1";
import { BYE_ID } from "./consts";
import { Match, Pairing } from "./types";

export const makeMatch = (
  roundID: number,
  pairing: Pairing,
  ID:string = uuid()
): Match => {
  const hasBye = pairing.includes(BYE_ID);

  return {
    roundID,
    ID,
    pairing,
    result: [0, hasBye ? -1 : 0],
    hasBye
  };
};

export const makeRound = (pairings: Pairing[], roundID: number) =>
  pairings.map(pairing => makeMatch(roundID, pairing));
