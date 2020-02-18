import { pairPlayers, shiftArray, toPairs } from './pair';

test('shiftArray should return correct correctly reordered array', () => {
  expect(shiftArray([1, 2, 3, 4], 1)).toStrictEqual([1, 4, 2, 3]);
  expect(shiftArray([1, 2, 3, 4], 2)).toStrictEqual([1, 3, 4, 2]);
  expect(shiftArray([1, 2, 3, 4], 3)).toStrictEqual([1, 2, 3, 4]);
});

test('toPairs should return correct pairings for even number of elements', () => {
  expect(toPairs([1, 2, 3, 4])).toStrictEqual([
    [1, 4],
    [2, 3],
  ]);
});

test('toPairs should return correct pairings for odd number of elements', () => {
  expect(toPairs([1, 2, 3, 4, 5])).toStrictEqual([
    [1, 5],
    [2, 4],
  ]);
});

test('pairPlayers should return correct pairings for odd number of players', () => {
  const player1 = {
    ID: 1,
    name: 'Player 1',
    active: true,
  };
  const player2 = {
    ID: 2,
    name: 'Player 2',
    active: true,
  };
  const player3 = {
    ID: 3,
    name: 'Player 3',
    active: true,
  };

  expect(pairPlayers([player1, player2, player3], 0)).toStrictEqual([
    [1, -1],
    [2, 3],
  ]);
});

test('pairPlayers should return correct pairings', () => {
  const player1 = {
    ID: 1,
    name: 'Player 1',
    active: true,
  };
  const player2 = {
    ID: 2,
    name: 'Player 2',
    active: true,
  };
  const player3 = {
    ID: 3,
    name: 'Player 3',
    active: true,
  };

  expect(pairPlayers([player1, player2, player3], 1)).toStrictEqual([
    [1, 3],
    [-1, 2],
  ]);
});

test('pairPlayers should return correct pairings', () => {
  const player1 = {
    ID: 1,
    name: 'Player 1',
    active: true,
  };
  const player2 = {
    ID: 2,
    name: 'Player 2',
    active: true,
  };
  const player3 = {
    ID: 3,
    name: 'Player 3',
    active: true,
  };

  expect(pairPlayers([player1, player2, player3], 2)).toStrictEqual([
    [1, 2],
    [3, -1],
  ]);
});
