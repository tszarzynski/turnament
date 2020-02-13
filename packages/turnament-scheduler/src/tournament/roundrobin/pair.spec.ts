import { pairPlayers, shiftArray, toPairs } from "./pair";


test("shiftArray should return correct correctly reordered array", () => {
  expect(shiftArray([1, 2, 3, 4], 1)).toStrictEqual([1, 4, 2, 3]);
  expect(shiftArray([1, 2, 3, 4], 2)).toStrictEqual([1, 3, 4, 2]);
  expect(shiftArray([1, 2, 3, 4], 3)).toStrictEqual([1, 2, 3, 4]);
});

test("toPairs should return correct pairings for even number of elements", () => {
  expect(toPairs([1, 2, 3, 4])).toStrictEqual([
    [1, 4],
    [2, 3]
  ]);
});

test("toPairs should return correct pairings for odd number of elements", () => {
  expect(toPairs([1, 2, 3])).toStrictEqual([
    [1, 3],
    [2, -1]
  ]);
});

test("pairPlayers should return correct pairings", () => {
  const player1 = {
    ID: 1,
    name: "Player 1",
    gamesWon: 0,
    matchesWon: 0,
    matchesLost: 0,
    omv: 0,
    opponents: []
  };
  const player2 = {
    ID: 2,
    name: "Player 2",
    gamesWon: 0,
    matchesWon: 0,
    matchesLost: 0,
    omv: 0,
    opponents: []
  };
  const player3 = {
    ID: 3,
    name: "Player 3",
    gamesWon: 0,
    matchesWon: 0,
    matchesLost: 0,
    omv: 0,
    opponents: []
  };

  expect(pairPlayers([player1, player2, player3])).toStrictEqual([
    [1, 3],
    [2, -1]
  ]);
});

test("pairPlayers should return correct pairings", () => {
  const player1 = {
    ID: 1,
    name: "Player 1",
    gamesWon: 0,
    matchesWon: 0,
    matchesLost: 0,
    omv: 0,
    opponents: [3]
  };
  const player2 = {
    ID: 2,
    name: "Player 2",
    gamesWon: 0,
    matchesWon: 0,
    matchesLost: 0,
    omv: 0,
    opponents: [-1]
  };
  const player3 = {
    ID: 3,
    name: "Player 3",
    gamesWon: 0,
    matchesWon: 0,
    matchesLost: 0,
    omv: 0,
    opponents: [1]
  };

  expect(pairPlayers([player1, player2, player3])).toStrictEqual([
    [1, 2],
    [3, -1]
  ]);
});
