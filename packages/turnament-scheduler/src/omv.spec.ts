import { calcOMV } from "./omv";

test("calcOMV should return correct value", () => {
  const players = [
    {
      ID: 1,
      name: "Player 1",
      gamesWon: 2,
      matchesWon: 1,
      matchesLost: 0,
      omv: 0,
      opponents: [2]
    },
    {
      ID: 2,
      name: "Player 2",
      gamesWon: 1,
      matchesWon: 0,
      matchesLost: 1,
      omv: 0,
      opponents: [1]
    }
  ];
  expect(calcOMV(players, players[0])).toBe(0);
  expect(calcOMV(players, players[1])).toBe(1);
});

test("calcOMV should return correct value", () => {
  const players = [
    {
      ID: 1,
      name: "Player 1",
      gamesWon: 2,
      matchesWon: 1,
      matchesLost: 1,
      omv: 0,
      opponents: [2, 3]
    },
    {
      ID: 2,
      name: "Player 2",
      gamesWon: 1,
      matchesWon: 1,
      matchesLost: 1,
      omv: 0,
      opponents: [1, -1]
    },
    {
      ID: 3,
      name: "Player 3",
      gamesWon: 2,
      matchesWon: 2,
      matchesLost: 0,
      omv: 0,
      opponents: [-1, 1]
    }
  ];
  expect(calcOMV(players, players[0])).toBe(0.75);
  expect(calcOMV(players, players[1])).toBe(0.5);
  expect(calcOMV(players, players[2])).toBe(0.5);
});