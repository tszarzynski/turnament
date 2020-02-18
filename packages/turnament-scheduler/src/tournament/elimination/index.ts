import { BYE_ID } from '../../consts';
import { makePlayersWithResults } from '../../players';
import { makeRound } from '../../round';
import { Match, Pairing, Player, Scheduler, Eliminator } from '../../types';
import { isOdd } from '../../utils';

/**
 * Folds array into pairs
 */
export const toPairs = (arr: number[]): Pairing[] => {

  //if (arr.length < 2) return [];

  let arrToFold, bye;

  if (isOdd(arr.length)) {
    bye = arr[0]
    arrToFold = arr.slice(1);
  } else {
    arrToFold = arr;
  }

  // fold intro pairs
  const pairs = arrToFold.reduce<Pairing[]>(function (acc, value, index, array) {
    if (index % 2 === 0)
      acc.push(array.slice(index, index + 2) as Pairing);
    return acc;
  }, []);

  return bye ? [[bye, BYE_ID], ...pairs] : pairs
};


export const scheduler: Scheduler & Eliminator = {
  name: 'Elimination',
  type: 'ELIMINATION',
  makeRound: (players: Player[], results: Match[], roundID: number) => {
    const playersWithResults = makePlayersWithResults(players, results);
    // filter out inactive players
    const playersToPair = playersWithResults.filter(player => player.active);

    // filter out players witn no loses for upper bracket
    const playersInUpperBracket = playersWithResults.filter(player => player.matchesLost === 0).map(player => player.ID)
    //filter out players with one one lose for lower bracket
    const playersInLowerBracket = playersWithResults.filter(player => player.matchesLost === 1).map(player => player.ID)

    const upperBracketPairs = playersInUpperBracket.length > 1 ? toPairs(playersInUpperBracket) : [];
    const lowerBracketPairs = playersInLowerBracket.length > 1 ? toPairs(playersInLowerBracket) : [];

    let pairings: Pairing[];
    if (!upperBracketPairs.length && !lowerBracketPairs.length) {
      pairings = [[playersInUpperBracket[0], playersInLowerBracket[0]]]
    } else {
      pairings = [...upperBracketPairs, ...lowerBracketPairs]
    }

    return makeRound(pairings, roundID);

  },
  roundsNeeded: (numPlayers: number) => (numPlayers * 2) - 2,
  eliminate: (players: Player[], results: Match[]) => {
    const playersWithResults = makePlayersWithResults(players, results);
    // filter out inactive players
    const playerToEliminate = playersWithResults.filter(player => player.active);

    return playerToEliminate.filter(player => player.matchesLost > 1);
  }
};
