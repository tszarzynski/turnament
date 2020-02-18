import { makePlayersWithResults } from '../../players';
import { makeRound } from '../../round';
import { Eliminator, Match, Player, Scheduler } from '../../types';
import { calcNumRoundsFromResults } from '../../utils';
import { pairPlayers } from './pair';
import { roundsNeeded } from './rounds';

export const scheduler: Scheduler & Eliminator = {
  name: 'Elimination',
  type: 'ELIMINATION',
  makeRound: (players: Player[], results: Match[], roundID: number) => {
    const playersWithResults = makePlayersWithResults(players, results);
    // filter out inactive players
    const playersToPair = playersWithResults.filter(player => player.active);
    // calculate number of rounds played so far
    const numRoundsPlayed = calcNumRoundsFromResults(results);
    // make pairs
    let pairings = pairPlayers(playersToPair, numRoundsPlayed);
    // return new round
    return makeRound(pairings, roundID);
  },
  roundsNeeded,
  eliminate: (players: Player[], results: Match[]) => {
    const playersWithResults = makePlayersWithResults(players, results);
    // filter out inactive players
    const playerToEliminate = playersWithResults.filter(
      player => player.active
    );

    return playerToEliminate.filter(player => player.matchesLost > 1);
  },
};
