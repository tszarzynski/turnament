import { pairPlayers } from "./pair";


test("pairPlayers should return correct pairings when tournament starts", () => {
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
    [1, 2],
    [3, -1]
  ]);
});

test("pairPlayers should return correct pairings", () => {
  const player1 = {
    ID: 1,
    name: "Player 1",
    gamesWon: 2,
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
    matchesWon: 1,
    matchesLost: 0,
    omv: 0,
    opponents: [-1]
  };

  expect(pairPlayers([player1, player2, player3])).toStrictEqual([
    [1, 3],
    [2, -1]
  ]);
});


