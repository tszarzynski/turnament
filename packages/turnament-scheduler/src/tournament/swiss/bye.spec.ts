import { nominatePlayerForBye } from "./bye";
import { PlayerWithStats } from "../../types";

test("checkBye should return -1 for even number of players", () => {
  const players: PlayerWithStats[] = [
    {
      ID: 1,
      name: "Player 1",
      gamesWon: 0,
      matchesWon: 0,
      matchesLost: 0,
      omv: 0,
      opponents: []
    },
    {
      ID: 2,
      name: "Player 2",
      gamesWon: 0,
      matchesWon: 0,
      matchesLost: 0,
      omv: 0,
      opponents: []
    }
  ];
  expect(nominatePlayerForBye(players)).toBe(-1);
});

test("checkBye should return last player with smallest BYE  number", () => {
  const players: PlayerWithStats[] = [
    {
      ID: 1,
      name: "Player 1",
      gamesWon: 1,
      matchesWon: 1,
      matchesLost: 0,
      omv: 0,
      opponents: [2]
    },
    {
      ID: 2,
      name: "Player 2",
      gamesWon: 0,
      matchesWon: 0,
      matchesLost: 1,
      omv: 0,
      opponents: [1]
    },
    {
      ID: 3,
      name: "Player 3",
      gamesWon: 0,
      matchesWon: 0,
      matchesLost: 0,
      omv: 0,
      opponents: [-1]
    }
  ];
  expect(nominatePlayerForBye(players)).toBe(2);
});
