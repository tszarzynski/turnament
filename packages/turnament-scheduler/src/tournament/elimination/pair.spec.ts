import { toPairs, pairPlayers } from './pair';

test('toPairs should return correct pairings for even number of elements', () => {
  expect(toPairs([1, 2, 3, 4])).toStrictEqual([
    [1, 2],
    [3, 4],
  ]);
});

test('toPairs should throw for odd number of elements', () => {
  expect(toPairs([1, 2, 3])).toStrictEqual([[1, 2]]);
});

test('pairPlayers should return correct pairings for 1 round', () => {
  const player1 = {
    ID: 1,
    name: 'Player 1',
    active: true,
    matchesWon: 0,
    matchesLost: 0,
    gamesWon: 0,
    opponents: [],
  };
  const player2 = {
    ID: 2,
    name: 'Player 2',
    active: true,
    matchesWon: 0,
    matchesLost: 0,
    gamesWon: 0,
    opponents: [],
  };
  const player3 = {
    ID: 3,
    name: 'Player 3',
    active: true,
    matchesWon: 0,
    matchesLost: 0,
    gamesWon: 0,
    opponents: [],
  };

  const player4 = {
    ID: 4,
    name: 'Player 4',
    active: true,
    matchesWon: 0,
    matchesLost: 0,
    gamesWon: 0,
    opponents: [],
  };

  const player5 = {
    ID: 5,
    name: 'Player 5',
    active: true,
    matchesWon: 0,
    matchesLost: 0,
    gamesWon: 0,
    opponents: [],
  };

  expect(
    pairPlayers([player1, player2, player3, player4, player5], 0)
  ).toStrictEqual([
    [1, -1],
    [2, -1],
    [3, -1],
    [4, 5],
  ]);
});

test('pairPlayers should return correct pairings for 2 round', () => {
  const player1 = {
    ID: 1,
    name: 'Player 1',
    active: true,
    matchesWon: 1,
    matchesLost: 0,
    gamesWon: 0,
    opponents: [-1],
  };
  const player2 = {
    ID: 2,
    name: 'Player 2',
    active: true,
    matchesWon: 1,
    matchesLost: 0,
    gamesWon: 0,
    opponents: [-1],
  };
  const player3 = {
    ID: 3,
    name: 'Player 3',
    active: true,
    matchesWon: 1,
    matchesLost: 0,
    gamesWon: 0,
    opponents: [-1],
  };

  const player4 = {
    ID: 4,
    name: 'Player 4',
    active: true,
    matchesWon: 1,
    matchesLost: 0,
    gamesWon: 0,
    opponents: [5],
  };

  const player5 = {
    ID: 5,
    name: 'Player 5',
    active: true,
    matchesWon: 0,
    matchesLost: 1,
    gamesWon: 0,
    opponents: [4],
  };

  expect(
    pairPlayers([player1, player2, player3, player4, player5], 1)
  ).toStrictEqual([
    [1, 2],
    [3, 4],
  ]);
});

test('pairPlayers should return correct pairings for 3 round', () => {
  const player1 = {
    ID: 1,
    name: 'Player 1',
    active: true,
    matchesWon: 2,
    matchesLost: 0,
    gamesWon: 0,
    opponents: [-1, 2],
  };
  const player2 = {
    ID: 2,
    name: 'Player 2',
    active: true,
    matchesWon: 1,
    matchesLost: 1,
    gamesWon: 0,
    opponents: [-1, 1],
  };
  const player3 = {
    ID: 3,
    name: 'Player 3',
    active: true,
    matchesWon: 2,
    matchesLost: 0,
    gamesWon: 0,
    opponents: [-1, 4],
  };

  const player4 = {
    ID: 4,
    name: 'Player 4',
    active: true,
    matchesWon: 1,
    matchesLost: 1,
    gamesWon: 0,
    opponents: [5, 3],
  };

  const player5 = {
    ID: 5,
    name: 'Player 5',
    active: true,
    matchesWon: 0,
    matchesLost: 1,
    gamesWon: 0,
    opponents: [4],
  };

  expect(
    pairPlayers([player1, player2, player3, player4, player5], 3)
  ).toStrictEqual([
    [1, 3],
    [5, 2],
  ]);
});

test('pairPlayers should return correct pairings for 4th round', () => {
  const player1 = {
    ID: 1,
    name: 'Player 1',
    active: true,
    matchesWon: 3,
    matchesLost: 0,
    gamesWon: 0,
    opponents: [-1, 2, 3],
  };
  const player2 = {
    ID: 2,
    name: 'Player 2',
    active: true,
    matchesWon: 1,
    matchesLost: 2,
    gamesWon: 0,
    opponents: [-1, 1, 5],
  };
  const player3 = {
    ID: 3,
    name: 'Player 3',
    active: true,
    matchesWon: 2,
    matchesLost: 1,
    gamesWon: 0,
    opponents: [-1, 4, 1],
  };

  const player4 = {
    ID: 4,
    name: 'Player 4',
    active: true,
    matchesWon: 1,
    matchesLost: 1,
    gamesWon: 0,
    opponents: [5, 3],
  };

  const player5 = {
    ID: 5,
    name: 'Player 5',
    active: true,
    matchesWon: 1,
    matchesLost: 1,
    gamesWon: 0,
    opponents: [4, 2],
  };

  expect(
    pairPlayers([player1, player2, player3, player4, player5], 3)
  ).toStrictEqual([[4, 5]]);
});

test('pairPlayers should return correct pairings for 5th round', () => {
  const player1 = {
    ID: 1,
    name: 'Player 1',
    active: true,
    matchesWon: 3,
    matchesLost: 0,
    gamesWon: 0,
    opponents: [-1, 2, 3],
  };
  const player2 = {
    ID: 2,
    name: 'Player 2',
    active: true,
    matchesWon: 1,
    matchesLost: 2,
    gamesWon: 0,
    opponents: [-1, 1, 5],
  };
  const player3 = {
    ID: 3,
    name: 'Player 3',
    active: true,
    matchesWon: 2,
    matchesLost: 1,
    gamesWon: 0,
    opponents: [-1, 4, 1],
  };

  const player4 = {
    ID: 4,
    name: 'Player 4',
    active: true,
    matchesWon: 1,
    matchesLost: 2,
    gamesWon: 0,
    opponents: [5, 3, 5],
  };

  const player5 = {
    ID: 5,
    name: 'Player 5',
    active: true,
    matchesWon: 2,
    matchesLost: 1,
    gamesWon: 0,
    opponents: [4, 2, 4],
  };

  expect(
    pairPlayers([player1, player2, player3, player4, player5], 3)
  ).toStrictEqual([[3, 5]]);
});

test('pairPlayers should return correct pairings for 6th round', () => {
  const player1 = {
    ID: 1,
    name: 'Player 1',
    active: true,
    matchesWon: 3,
    matchesLost: 0,
    gamesWon: 0,
    opponents: [-1, 2, 3],
  };
  const player2 = {
    ID: 2,
    name: 'Player 2',
    active: true,
    matchesWon: 1,
    matchesLost: 2,
    gamesWon: 0,
    opponents: [-1, 1, 5],
  };
  const player3 = {
    ID: 3,
    name: 'Player 3',
    active: true,
    matchesWon: 2,
    matchesLost: 2,
    gamesWon: 0,
    opponents: [-1, 4, 1, 5],
  };

  const player4 = {
    ID: 4,
    name: 'Player 4',
    active: true,
    matchesWon: 1,
    matchesLost: 2,
    gamesWon: 0,
    opponents: [5, 3, 5],
  };

  const player5 = {
    ID: 5,
    name: 'Player 5',
    active: true,
    matchesWon: 3,
    matchesLost: 1,
    gamesWon: 0,
    opponents: [4, 2, 4, 3],
  };

  expect(
    pairPlayers([player1, player2, player3, player4, player5], 3)
  ).toStrictEqual([[1, 5]]);
});

test('pairPlayers should return correct pairings for 7th round', () => {
  const player1 = {
    ID: 1,
    name: 'Player 1',
    active: true,
    matchesWon: 4,
    matchesLost: 0,
    gamesWon: 0,
    opponents: [-1, 2, 3, 5],
  };
  const player2 = {
    ID: 2,
    name: 'Player 2',
    active: true,
    matchesWon: 1,
    matchesLost: 2,
    gamesWon: 0,
    opponents: [-1, 1, 5],
  };
  const player3 = {
    ID: 3,
    name: 'Player 3',
    active: true,
    matchesWon: 2,
    matchesLost: 2,
    gamesWon: 0,
    opponents: [-1, 4, 1, 5],
  };

  const player4 = {
    ID: 4,
    name: 'Player 4',
    active: true,
    matchesWon: 1,
    matchesLost: 2,
    gamesWon: 0,
    opponents: [5, 3, 5],
  };

  const player5 = {
    ID: 5,
    name: 'Player 5',
    active: true,
    matchesWon: 3,
    matchesLost: 2,
    gamesWon: 0,
    opponents: [4, 2, 4, 3, 1],
  };

  expect(
    pairPlayers([player1, player2, player3, player4, player5], 3)
  ).toStrictEqual([]);
});
