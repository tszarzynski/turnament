import { pipe } from 'ramda';

import { BYE_ID } from './consts';
import { rankPlayers } from './rank';
import { desc, sortWith, asc } from './sort';
import { PlayerWithResults, PlayerWithBye, PlayerWithStats } from './types';
import { last, prop, isOdd, first } from './utils';

const hasOddNumOfPlayers = (players: PlayerWithResults[]) =>
  isOdd(players.length);
const countByes = (opponents: number[]) =>
  opponents.filter(id => id === BYE_ID).length;
const playersWithByes = (players: PlayerWithResults[]) =>
  players.map(player => ({ ...player, bye: countByes(player.opponents) }));

/**
 * Check if we need to grant 'bye' to a player and return nominated player ID. Otherwise return -1.
 * @param players list of players
 */
export const nominateWeakestPlayerForBye = (players: PlayerWithStats[]) =>
  hasOddNumOfPlayers(players)
    ? pipe(
        rankPlayers,
        playersWithByes,
        sortWith<PlayerWithBye>([desc('bye')]),
        last,
        prop('ID')
      )(players)
    : BYE_ID;

/**
 * Check if we need to grant 'bye' to a player and return nominated player ID. Otherwise return -1.
 * @param players list of players
 */
export const nominateStrongestPlayerForBye = (players: PlayerWithStats[]) =>
  hasOddNumOfPlayers(players)
    ? pipe(
        rankPlayers,
        playersWithByes,
        sortWith<PlayerWithBye>([asc('bye')]),
        first,
        prop('ID')
      )(players)
    : BYE_ID;
