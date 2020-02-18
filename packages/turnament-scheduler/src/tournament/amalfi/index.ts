import { BYE_ID } from '../../consts';
import { makePlayersWithResults, makePlayersWithStats } from '../../players';
import { makeRound } from '../../round';
import { Match, Pairing, Player, Scheduler, Eliminator } from '../../types';
import { isOdd } from '../../utils';
import { rankPlayers } from '../../rank';

/**
 * Folds array into pairs
 */
export const toPairs = (arr: number[], offset: number): Pairing[] => {

  let arrToFold, bye;

  if (isOdd(arr.length)) {
    bye = arr[0]
    arrToFold = arr.slice(1);
  } else {
    arrToFold = arr;
  }

  let pairs: Pairing[] = []
  for (let i = 0; i < arrToFold.length - offset; i++) {
    pairs.push([arrToFold[i], arrToFold[i + offset]])
  }

  return bye ? [[bye, BYE_ID], ...pairs] : pairs
};

/**
 * Return the minimum number of rounds to be played to determine winner
 * @param numPlayers Number of players
 * @param numStandings Number of standings to determine
 */
export function roundsNeeded(numStandings: number) {
  return (numPlayers: number) =>
    Math.ceil(Math.log2(numPlayers) + Math.log2(numStandings));
}

export const scheduler: Scheduler = {
  name: 'Amalfi',
  type: 'AMALFI',
  makeRound: (players: Player[], results: Match[], roundID: number) => {
    const playersWithStats = makePlayersWithStats(makePlayersWithResults(players, results));
    // filter out inactive players
    const playersToPair = playersWithStats.filter(player => player.active);
    const playerToPairRanked = rankPlayers(playersToPair);

    const numPlayedRounds = Math.min(...playerToPairRanked.map(players => players.opponents.length));
    const numRounds = roundsNeeded(1)(playerToPairRanked.length);

    let pairings = toPairs(playerToPairRanked.map(player => player.ID), numRounds - numPlayedRounds)

    return makeRound(pairings, roundID);

  },
  roundsNeeded: roundsNeeded(1)

};
