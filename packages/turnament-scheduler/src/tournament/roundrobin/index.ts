import { makeRound } from '../../round';
import { Match, Player, Scheduler } from '../../types';
import { calcNumRoundsFromResults } from '../../utils';
import { pairPlayers } from './pair';
import { roundsNeeded } from './rounds';

export const scheduler: Scheduler = {
  name: 'Round Robin',
  type: 'ROUND_ROBIN',
  makeRound: (players: Player[], results: Match[], roundID: number) => {
    // filter out inactive players
    const playersToPair = players.filter((player) => player.active);
    // calculate number of rounds played so far
    const numRoundsPlayed = calcNumRoundsFromResults(results);

    const pairings = pairPlayers(playersToPair, numRoundsPlayed);

    return makeRound(pairings, roundID);
  },
  roundsNeeded,
};
