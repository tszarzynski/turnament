import {
  Match,
  Player,
  PlayerWithResults,
  Results,
  PlayerWithStats
} from "./types";
import { calcOMV } from "./omv";

export const makePlayersWithResults = (
  players: Player[],
  rounds: Match[]
): PlayerWithResults[] =>
  players.map(player => {
    // find all matches played by player
    const playerMatches = rounds.filter(match =>
      match.pairing.includes(player.ID)
    );
    // extract results
    const results: Results = playerMatches.reduce(
      (acc: Results, match: Match) => {
        const idxPlayer = match.pairing.findIndex(p => player.ID === p)!;
        const idxOpponent = match.pairing.length - 1 - idxPlayer;
        const hasWon = match.result[idxPlayer] > match.result[idxOpponent];
        return {
          gamesWon: acc.gamesWon + match.result[idxPlayer],
          matchesWon: acc.matchesWon + (hasWon ? 1 : 0),
          matchesLost: acc.matchesLost + (!hasWon ? 1 : 0),
          opponents: [...acc.opponents, match.pairing[idxOpponent]]
        };
      },
      {
        gamesWon: 0,
        matchesWon: 0,
        matchesLost: 0,
        opponents: []
      }
    );

    return {
      ...player,
      ...results
    };
  });

export const makePlayersWithStats = (
  players: PlayerWithResults[]
): PlayerWithStats[] =>
  players.map(player => ({
    ...player,
    omv: calcOMV(players, player)
  }));
