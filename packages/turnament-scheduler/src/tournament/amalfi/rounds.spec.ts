import { roundsNeeded as swissRoundsNeeded } from "../swiss/rounds";
import { roundsNeeded } from "./rounds";

test("roundsNeeded: power-of-2 player counts", () => {
	expect(roundsNeeded(4)).toBe(3);   // ceil(log2(4) + 1) = ceil(2+1) = 3
	expect(roundsNeeded(8)).toBe(4);   // ceil(log2(8) + 1) = ceil(3+1) = 4
	expect(roundsNeeded(16)).toBe(5);  // ceil(log2(16) + 1) = ceil(4+1) = 5
});

test("roundsNeeded: non-power-of-2 player counts", () => {
	expect(roundsNeeded(5)).toBe(4);   // ceil(2.32 + 1) = ceil(3.32) = 4
	expect(roundsNeeded(6)).toBe(4);   // ceil(2.58 + 1) = ceil(3.58) = 4
	expect(roundsNeeded(10)).toBe(5);  // ceil(3.32 + 1) = ceil(4.32) = 5
});

test("Amalfi always needs exactly 1 more round than Swiss for same player count", () => {
	const playerCounts = [4, 5, 6, 8, 10, 16, 32];
	for (const n of playerCounts) {
		expect(roundsNeeded(n)).toBe(swissRoundsNeeded(1)(n) + 1);
	}
});
