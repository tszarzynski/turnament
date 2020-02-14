import { makePlayersWithResults } from '../../players';
import { makeRound } from '../../round';
import { Match, Player, Scheduler } from '../../types';
import { pairPlayers } from './pair';
import { roundsNeeded } from './rounds';

export const scheduler: Scheduler = {
  name: 'Round Robin',
  type: 'ROUND_ROBIN',
  makeRound: (players: Player[], results: Match[], roundID: number) => {
    const playersWithResults = makePlayersWithResults(players, results);
    // filter out inactive players
    const playersToPair = playersWithResults.filter(player => player.active);
    const pairings = pairPlayers(playersToPair);

    return makeRound(pairings, roundID);
  },
  roundsNeeded,
};
