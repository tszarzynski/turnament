import { BYE_ID } from '../../consts';
import { Pairing, PlayerWithResults } from '../../types';
import { isPowOf2, nextPowOf2 } from '../../utils';

/**
 * Folds array into pairs of neighbouring elements. Ignores last element if array has odd length.
 */
export const toPairs = (arr: number[]): Pairing[] =>
  arr.reduce<Pairing[]>(
    (acc, _, index, array) =>
      index % 2 === 0 && index + 1 < array.length
        ? [...acc, [array[index], array[index + 1]]]
        : acc,
    []
  );

export function pairPlayers(
  players: PlayerWithResults[],
  numRoundsPlayed: number
) {
  let playersToPair: PlayerWithResults[] = players.slice();
  let playersWithByes: PlayerWithResults[] = [];

  // if first round and number of players is not power of 2 then nominate for byes
  // currently nominating players at the front of the list
  if (numRoundsPlayed === 0) {
    if (!isPowOf2(players.length)) {
      const numByes = nextPowOf2(players.length) - players.length;
      playersToPair = players.slice(numByes);
      playersWithByes = players.slice(0, numByes);
    }
  }

  // filter out players witn no loses for upper bracket, map to IDs only
  const playersInUpperBracket = playersToPair
    .filter(player => player.matchesLost === 0)
    .map(player => player.ID);
  //filter out players with one one lose for lower bracket, sort by number of games playes, map to IDs only
  const playersInLowerBracket = playersToPair
    .filter(player => player.matchesLost === 1)
    .sort((a, b) => a.opponents.length - b.opponents.length)
    .map(player => player.ID);

  const upperBracketPairs =
    playersInUpperBracket.length > 1 ? toPairs(playersInUpperBracket) : [];
  const lowerBracketPairs =
    playersInLowerBracket.length > 1 ? toPairs(playersInLowerBracket) : [];

  const playersLeft =
    playersWithByes.length +
    playersInUpperBracket.length +
    playersInLowerBracket.length;

  // end of tournament, only one player left
  if (playersLeft === 1) return [];

  let pairings: Pairing[];
  // final match
  if (!upperBracketPairs.length && !lowerBracketPairs.length) {
    pairings = [[playersInUpperBracket[0], playersInLowerBracket[0]]];
  } else {
    pairings = [
      ...playersWithByes.map(player => [player.ID, BYE_ID] as Pairing),
      ...upperBracketPairs,
      ...lowerBracketPairs,
    ];
  }

  return pairings;
}
