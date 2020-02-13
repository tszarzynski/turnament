import { pairPlayers } from '../tournament/swiss/pair';
import { rankPlayers } from '../rank';
import { Pairing, PlayerWithResults, PlayerWithStats } from '../types';
import { calcOMV } from '../omv';

export function playRound(players: PlayerWithStats[]): PlayerWithStats[] {
  // make pairs
  const pairings = pairPlayers(players);

  let roundResults: PlayerWithResults[] = [];
  pairings.forEach((pair: Pairing) => {
    // BYE
    if (checkIfBye(pair)) {
      roundResults = roundResults.concat(playBye(pair, players));
    } else {
      roundResults = roundResults.concat(playMatch(pair, players));
    }
  });
  const roundResultsWithStats = roundResults.map(pl => ({
    ...pl,
    omv: calcOMV(roundResults, pl),
  })) as PlayerWithStats[];

  return rankPlayers(roundResultsWithStats);
}

function updatePlayer(pl: PlayerWithResults, props: Partial<PlayerWithResults>): PlayerWithResults {
  return { ...pl, ...props };
}

function playMatch([pr1, pr2]: Pairing, players: PlayerWithResults[]) {
  console.log('Playing: ' + pr1 + ' vs ' + pr2);
  const pl1 = players.find(p => p.ID === pr1)!;
  const pl2 = players.find(p => p.ID === pr2)!;

  const matchResult = Array.from({ length: 3 }, () =>
    Math.random() > 0.5 ? pl1.ID : pl2.ID
  );

  const pl1GamesWon = matchResult.filter(r => r === pl1.ID).length;
  const pl2GamesWon = matchResult.filter(r => r === pl2.ID).length;

  return [
    updatePlayer(pl1, {
      gamesWon: pl1.gamesWon + matchResult.filter(r => r === pl1.ID).length,
      matchesWon:
        pl1GamesWon > pl2GamesWon ? pl1.matchesWon + 1 : pl1.matchesWon,
      matchesLost:
        pl1GamesWon < pl2GamesWon ? pl1.matchesLost + 1 : pl1.matchesLost,

      opponents: [...pl1.opponents, pl2.ID],
    }),
    updatePlayer(pl2, {
      gamesWon: pl2.gamesWon + matchResult.filter(r => r === pl2.ID).length,
      matchesWon:
        pl1GamesWon < pl2GamesWon ? pl2.matchesWon + 1 : pl2.matchesWon,
      matchesLost:
        pl1GamesWon > pl2GamesWon ? pl2.matchesLost + 1 : pl2.matchesLost,
      opponents: [...pl2.opponents, pl1.ID],
    }),
  ];
}

function checkIfBye([pr1, pr2]: Pairing) {
  return pr1 === -1 || pr2 === -1;
}
function playBye([pr1, pr2]: Pairing, players: PlayerWithStats[]) {
  console.log('Playing BYE');
  const pl = players.find(p => p.ID === pr1 || p.ID === pr2)!;
  return [
    updatePlayer(pl, {
      matchesWon: pl.matchesWon + 1,
      opponents: [...pl.opponents, -1],
    }),
  ];
}
