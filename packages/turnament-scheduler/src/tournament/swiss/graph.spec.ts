import {
  calcHighestScore,
  calcEdgeWeight,
  makeWeightedGraph,
  quality
} from "./graph";


test("quality should return correct value", () => {
  expect(quality(0, 0)).toBe(1);
  expect(quality(1, 1)).toBe(16);
});

test("calcHighestScore should return correct value", () => {
  const players = [
    {
      ID: 1,
      name: "Player 1",
      gamesWon: 2,
      matchesWon: 1,
      matchesLost: 0,
      omv: 0,
      opponents: []
    },
    {
      ID: 2,
      name: "Player 2",
      gamesWon: 1,
      matchesWon: 0,
      matchesLost: 1,
      omv: 0,
      opponents: []
    }
  ];

  expect(calcHighestScore(players)).toBe(2);
});

test("calcEdgeWeight should return correct weight", () => {
  const player1 = {
    ID: 1,
    name: "Player 1",
    gamesWon: 1,
    matchesWon: 1,
    matchesLost: 0,
    omv: 0,
    opponents: [2]
  };
  const player2 = {
    ID: 2,
    name: "Player 2",
    gamesWon: 0,
    matchesWon: 0,
    matchesLost: 1,
    omv: 0,
    opponents: [1]
  };
  const player3 = {
    ID: 3,
    name: "Player 3",
    gamesWon: 0,
    matchesWon: 0,
    matchesLost: 0,
    omv: 0,
    opponents: [-1]
  };

  expect(calcEdgeWeight(1, player1, player2)).toBeLessThan(
    calcEdgeWeight(1, player1, player3)
  );

  expect(calcEdgeWeight(1, player1, player2)).toBe(
    calcEdgeWeight(1, player2, player1)
  );
});

test("calcWeights should return correct weights", () => {
  const player1 = {
    ID: 1,
    name: "Player 1",
    gamesWon: 1,
    matchesWon: 1,
    matchesLost: 0,
    omv: 0,
    opponents: [2]
  };
  const player2 = {
    ID: 2,
    name: "Player 2",
    gamesWon: 0,
    matchesWon: 0,
    matchesLost: 1,
    omv: 0,
    opponents: [1]
  };
  const player3 = {
    ID: 3,
    name: "Player 3",
    gamesWon: 0,
    matchesWon: 0,
    matchesLost: 0,
    omv: 0,
    opponents: [-1]
  };

  expect(makeWeightedGraph([player1, player2, player3])).toStrictEqual([
    [0, 1, 4],
    [0, 2, 21],
    [1, 2, 21]
  ]);
});
