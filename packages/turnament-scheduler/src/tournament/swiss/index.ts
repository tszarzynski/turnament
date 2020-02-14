import { makePlayersWithResults, makePlayersWithStats } from '../../players';
import { makeRound } from '../../round';
import { Match, Player, Tournament } from '../../types';
import { pairPlayers } from './pair';
import { roundsNeeded } from './rounds';

export const tournament: Tournament = {
  makeRound: (players: Player[], results: Match[], roundID: number) => {
    const playersWithStats = makePlayersWithStats(
      makePlayersWithResults(players, results)
    );
    // filter out inactive players
    const playersToPair = playersWithStats.filter(player => player.active);
    const pairings = pairPlayers(playersToPair);
    return makeRound(pairings, roundID);
  },
  roundsNeeded: roundsNeeded(1),
};
