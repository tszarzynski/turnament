import { playRound } from './round';
import { PlayerWithResults, PlayerWithStats } from '../types';
import { roundsNeeded } from '../tournament/swiss/rounds';

const players: PlayerWithStats[] = [
  { ID: 0, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
  { ID: 1, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
  { ID: 2, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
  { ID: 3, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
  { ID: 4, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
  { ID: 5, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
];

function tournament(players: PlayerWithStats[]) {
  const numRounds = roundsNeeded(1)(players.length);
  let round = 0;

  while (round++ < numRounds) {
    console.log('### Round ' + round);
    players = playRound(players);
    console.log(players);
  }
}

tournament(players);
