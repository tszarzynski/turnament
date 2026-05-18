import { calcBuchholzCut1 } from "./buchholz";

const base = { active: true, gamesWon: 0, matchesLost: 0, omv: 0, buchholzCut1: 0, nps: 0 };

test("calcBuchholzCut1 drops the lowest opponent score", () => {
	const players = [
		{ ...base, ID: 1, name: "P1", matchesWon: 2, opponents: [2, 3] },
		{ ...base, ID: 2, name: "P2", matchesWon: 1, opponents: [1, 3] },
		{ ...base, ID: 3, name: "P3", matchesWon: 0, opponents: [1, 2] },
	];

	expect(calcBuchholzCut1(players, players[0])).toBe(1);
	expect(calcBuchholzCut1(players, players[1])).toBe(2);
	expect(calcBuchholzCut1(players, players[2])).toBe(2);
});

test("calcBuchholzCut1 with three opponents drops only one minimum", () => {
	const players = [
		{ ...base, ID: 1, name: "P1", matchesWon: 3, opponents: [2, 3, 4] },
		{ ...base, ID: 2, name: "P2", matchesWon: 2, opponents: [1] },
		{ ...base, ID: 3, name: "P3", matchesWon: 1, opponents: [1] },
		{ ...base, ID: 4, name: "P4", matchesWon: 0, opponents: [1] },
	];

	expect(calcBuchholzCut1(players, players[0])).toBe(3);
});

test("calcBuchholzCut1 excludes bye opponents (ID = -1)", () => {
	const players = [
		{ ...base, ID: 1, name: "P1", matchesWon: 2, opponents: [2, -1] },
		{ ...base, ID: 2, name: "P2", matchesWon: 0, opponents: [1] },
	];

	expect(calcBuchholzCut1(players, players[0])).toBe(0);
	expect(calcBuchholzCut1(players, players[1])).toBe(0);
});

test("calcBuchholzCut1 returns 0 with no real opponents", () => {
	const players = [
		{ ...base, ID: 1, name: "P1", matchesWon: 1, opponents: [-1] },
	];
	expect(calcBuchholzCut1(players, players[0])).toBe(0);
});

test("calcBuchholzCut1: tied minimums — drops only the FIRST minimum, not all", () => {
	const players = [
		{ ...base, ID: 1, name: "P1", matchesWon: 3, opponents: [2, 3, 4] },
		{ ...base, ID: 2, name: "P2", matchesWon: 1, opponents: [1] },
		{ ...base, ID: 3, name: "P3", matchesWon: 1, opponents: [1] },
		{ ...base, ID: 4, name: "P4", matchesWon: 1, opponents: [1] },
	];
	// opponentScores = [1, 1, 1] → min=1 at index 0
	// trimmed = [1, 1] → sum = 2
	expect(calcBuchholzCut1(players, players[0])).toBe(2);
});
