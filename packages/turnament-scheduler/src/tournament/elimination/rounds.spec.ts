import { matchesNeeded, roundsNeeded } from "./rounds";

test("roundsNeeded should calculate number of rounds", () => {
	expect(roundsNeeded(16)).toBe(7);
});

test("roundsNeeded should calculate number of rounds", () => {
	expect(roundsNeeded(128)).toBe(11);
});

test("matchesNeeded should calculate number of rounds", () => {
	expect(matchesNeeded(16)).toBe(30);
});

test("matchesNeeded should calculate number of rounds", () => {
	expect(matchesNeeded(128)).toBe(254);
});
