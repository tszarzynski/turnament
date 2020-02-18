import { pipe } from 'ramda';
import { BYE_ID } from '../../consts';
import { Pairing, PlayerWithStats } from '../../types';
import { nominateWeakestPlayerForBye } from '../../bye';
import { makeWeightedGraph } from './graph';
import { calcMWMForGraph, transformMWMToPairings } from './mwm';

export function pairPlayers(players: PlayerWithStats[]): Pairing[] {
  // check if we have a player with BYE nomination
  const nominatedID = nominateWeakestPlayerForBye(players);
  // remove nominated player from the list
  const playersToPair = players.filter(p => p.ID !== nominatedID);

  const pairings = pipe(
    makeWeightedGraph,
    calcMWMForGraph,
    transformMWMToPairings(playersToPair)
  )(playersToPair);

  return nominatedID !== BYE_ID
    ? [...pairings, [nominatedID, BYE_ID] as Pairing]
    : pairings;
}
