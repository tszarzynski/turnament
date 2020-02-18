import { BYE_ID } from '../../consts';
import { makePlayersWithResults } from '../../players';
import { makeRound } from '../../round';
import { Match, Pairing, Player, Scheduler, Eliminator } from '../../types';
import { isOdd, calcNumRoundsFromResults } from '../../utils';
import { pairPlayers } from './pair';

export const scheduler: Scheduler & Eliminator = {
  name: 'Elimination',
  type: 'ELIMINATION',
  makeRound: (players: Player[], results: Match[], roundID: number) => {
    const playersWithResults = makePlayersWithResults(players, results);
    // filter out inactive players
    const playersToPair = playersWithResults.filter(player => player.active);
    // calculate number of rounds played so far
    const numRoundsPlayed = calcNumRoundsFromResults(results);

    let pairings = pairPlayers(playersToPair, numRoundsPlayed);

    return makeRound(pairings, roundID);
  },
  roundsNeeded: (numPlayers: number) => numPlayers * 2 - 2,
  eliminate: (players: Player[], results: Match[]) => {
    const playersWithResults = makePlayersWithResults(players, results);
    // filter out inactive players
    const playerToEliminate = playersWithResults.filter(
      player => player.active
    );

    return playerToEliminate.filter(player => player.matchesLost > 1);
  },
};
