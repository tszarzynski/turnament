import { roundsNeeded } from "./rounds";

test("roundsNeeded should calculate number of rounds", () => {
    expect(roundsNeeded(6)).toBe(15);
  });