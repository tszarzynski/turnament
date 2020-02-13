import { pipe } from "ramda";

import { BYE_ID } from "../../consts";
import { rankPlayers } from "../../rank";
import { desc, sortWith } from "../../sort";
import { PlayerWithResults, PlayerWithBye, PlayerWithStats } from "../../types";
import { last, prop, isOdd } from "../../utils";

const hasOddNumOfPlayers = (players: PlayerWithResults[]) =>
  isOdd(players.length);
const countByes = (opponents: number[]) =>
  opponents.filter(id => id === BYE_ID).length;
const playersWithByes = (players: PlayerWithResults[]) =>
  players.map(player => ({ ...player, bye: countByes(player.opponents) }));
const sortByBye = (players: PlayerWithBye[]) =>
  sortWith<PlayerWithBye>([desc("bye")])(players);

/**
 * Check if we need to grant 'bye' to a player and return nominated player ID
 * @param players list of players
 */
export const nominatePlayerForBye = (players: PlayerWithStats[]) =>
  hasOddNumOfPlayers(players)
    ? pipe(rankPlayers, playersWithByes, sortByBye, last, prop("ID"))(players)
    : BYE_ID;
