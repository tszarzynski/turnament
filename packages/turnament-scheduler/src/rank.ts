import { compose } from "ramda";
import { makePlayersWithResults, makePlayersWithStats } from "./players";
import { desc, sortWith } from "./sort";
import { Match, Player, PlayerWithStats } from "./types";

/**
 * Returns sorted list of players. Function tries to resolve tiebreaks by using 3 sorting critetias:
 * number of matches won, number of games won and OMV.
 * @param players list of players
 */
export const rankPlayers = (players: PlayerWithStats[]) =>
  sortWith<PlayerWithStats>([
    desc("matchesWon"),
    desc("gamesWon"),
    desc("omv")
  ])(players);

export const getRanking = (players: Player[], results: Match[]) =>
  compose(
    rankPlayers,
    makePlayersWithStats,
    makePlayersWithResults
  )(players, results);
