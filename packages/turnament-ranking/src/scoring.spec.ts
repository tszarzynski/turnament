import {
	DEFAULT_POINTS_TO_WIN,
	formatScore,
	getDefaultMatchConfig,
	getScoringDivisor,
	isMatchCompleted,
} from "./scoring";

test("getScoringDivisor returns 2 for chess, 1 for backgammon", () => {
	expect(getScoringDivisor("CHESS")).toBe(2);
	expect(getScoringDivisor("BACKGAMMON")).toBe(1);
});

test("getDefaultMatchConfig: chess defaults", () => {
	expect(getDefaultMatchConfig("CHESS", "ELIMINATION")).toBe(2);
	expect(getDefaultMatchConfig("CHESS", "SWISS")).toBe(1);
	expect(getDefaultMatchConfig("CHESS", "ROUND_ROBIN")).toBe(1);
	expect(getDefaultMatchConfig("CHESS", "AMALFI")).toBe(1);
	expect(getDefaultMatchConfig("CHESS", undefined)).toBe(1);
});

test("getDefaultMatchConfig: backgammon always returns DEFAULT_POINTS_TO_WIN", () => {
	expect(getDefaultMatchConfig("BACKGAMMON", "SWISS")).toBe(DEFAULT_POINTS_TO_WIN);
	expect(getDefaultMatchConfig("BACKGAMMON", "ELIMINATION")).toBe(DEFAULT_POINTS_TO_WIN);
	expect(getDefaultMatchConfig("BACKGAMMON", undefined)).toBe(DEFAULT_POINTS_TO_WIN);
});

test("isMatchCompleted: backgammon — done when score reaches or exceeds target", () => {
	expect(isMatchCompleted([5, 3], "BACKGAMMON", 5)).toBe(true);
	expect(isMatchCompleted([6, 3], "BACKGAMMON", 5)).toBe(true); // overshoot via doubling cube
	expect(isMatchCompleted([4, 3], "BACKGAMMON", 5)).toBe(false);
});

test("isMatchCompleted: chess — done when sum equals minPointsToWin * 2", () => {
	expect(isMatchCompleted([3, 5], "CHESS", 4)).toBe(true);  // 1.5 + 2.5 = 4
	expect(isMatchCompleted([4, 4], "CHESS", 4)).toBe(true);  // 2.0 + 2.0 = 4
	expect(isMatchCompleted([2, 4], "CHESS", 4)).toBe(false); // only 3 games played
});

test("isMatchCompleted: undefined sport behaves as backgammon", () => {
	expect(isMatchCompleted([5, 0], undefined, 5)).toBe(true);
	expect(isMatchCompleted([4, 0], undefined, 5)).toBe(false);
});

test("formatScore: whole numbers have no decimal", () => {
	expect(formatScore(4, 2)).toBe("2");
	expect(formatScore(5, 1)).toBe("5");
});

test("formatScore: half-points show one decimal", () => {
	expect(formatScore(3, 2)).toBe("1.5");
	expect(formatScore(1, 2)).toBe("0.5");
});

test("isMatchCompleted: chess overshoot does NOT complete (sum > target*2)", () => {
	// Best of 4 → target*2 = 8. If result sums to 9, match was over-played.
	expect(isMatchCompleted([5, 4], "CHESS", 4)).toBe(false); // sum=9 ≠ 8
});

test("isMatchCompleted: chess undershoot does NOT complete (sum < target*2)", () => {
	expect(isMatchCompleted([2, 4], "CHESS", 4)).toBe(false); // sum=6 < 8
});

test("isMatchCompleted: chess exact completion (sum === target*2)", () => {
	expect(isMatchCompleted([3, 5], "CHESS", 4)).toBe(true);  // sum=8
	expect(isMatchCompleted([4, 4], "CHESS", 4)).toBe(true);  // tied but complete
	expect(isMatchCompleted([8, 0], "CHESS", 4)).toBe(true);  // one-sided
});

test("isMatchCompleted: backgammon exact target completes", () => {
	expect(isMatchCompleted([5, 3], "BACKGAMMON", 5)).toBe(true);
});

test("isMatchCompleted: backgammon overshoot via doubling cube also completes", () => {
	// Player jumps from 4 to 8 in one move — result overshoots target of 5
	expect(isMatchCompleted([8, 2], "BACKGAMMON", 5)).toBe(true);
});

test("isMatchCompleted: backgammon below target does not complete", () => {
	expect(isMatchCompleted([4, 3], "BACKGAMMON", 5)).toBe(false);
});
