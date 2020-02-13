import { makePlayersWithResults } from "../../players";
import { makeRound } from "../../round";
import { Match, Player, Tournament } from "../../types";
import { pairPlayers } from "./pair";
import { roundsNeeded } from "./rounds";

export const tournament: Tournament = {
  makeRound: (players: Player[], results: Match[], roundID: number) => {
    const pairings = pairPlayers(makePlayersWithResults(players, results));
    return makeRound(pairings, roundID);
  },
  roundsNeeded
};
