import { makePlayersWithResults, makePlayersWithStats } from '../../players';
import { makeRound } from '../../round';
import { Match, Player, Scheduler } from '../../types';
import { pairPlayers } from './pair';
import { roundsNeeded } from './rounds';

export const scheduler: Scheduler = {
  name: 'Swiss',
  type: 'SWISS',
  makeRound: (players: Player[], results: Match[], roundID: number) => {
    const playersWithStats = makePlayersWithStats(
      makePlayersWithResults(players, results)
    );
    // filter out inactive players
    const playersToPair = playersWithStats.filter(player => player.active);
    //paier players
    const pairings = pairPlayers(playersToPair);
    // return new round
    return makeRound(pairings, roundID);
  },
  roundsNeeded: roundsNeeded(1),
};
