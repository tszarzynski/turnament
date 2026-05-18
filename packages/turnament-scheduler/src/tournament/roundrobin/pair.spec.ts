import { pairPlayers, shiftArray, toPairs } from "./pair";

test("shiftArray should return correct correctly reordered array", () => {
	expect(shiftArray([1, 2, 3, 4], 1)).toStrictEqual([1, 4, 2, 3]);
	expect(shiftArray([1, 2, 3, 4], 2)).toStrictEqual([1, 3, 4, 2]);
	expect(shiftArray([1, 2, 3, 4], 3)).toStrictEqual([1, 2, 3, 4]);
});

test("toPairs should return correct pairings for even number of elements", () => {
	expect(toPairs([1, 2, 3, 4])).toStrictEqual([
		[1, 4],
		[2, 3],
	]);
});

test("toPairs should return correct pairings for odd number of elements", () => {
	expect(toPairs([1, 2, 3, 4, 5])).toStrictEqual([
		[1, 5],
		[2, 4],
	]);
});

test("pairPlayers should return correct pairings for odd number of players", () => {
	const player1 = {
		ID: 1,
		name: "Player 1",
		active: true,
	};
	const player2 = {
		ID: 2,
		name: "Player 2",
		active: true,
	};
	const player3 = {
		ID: 3,
		name: "Player 3",
		active: true,
	};

	expect(pairPlayers(0)([player1, player2, player3])).toStrictEqual([
		[1, -1],
		[2, 3],
	]);
});

test("pairPlayers should return correct pairings", () => {
	const player1 = {
		ID: 1,
		name: "Player 1",
		active: true,
	};
	const player2 = {
		ID: 2,
		name: "Player 2",
		active: true,
	};
	const player3 = {
		ID: 3,
		name: "Player 3",
		active: true,
	};

	expect(pairPlayers(1)([player1, player2, player3])).toStrictEqual([
		[1, 3],
		[-1, 2],
	]);
});

test("pairPlayers should return correct pairings", () => {
	const player1 = {
		ID: 1,
		name: "Player 1",
		active: true,
	};
	const player2 = {
		ID: 2,
		name: "Player 2",
		active: true,
	};
	const player3 = {
		ID: 3,
		name: "Player 3",
		active: true,
	};

	expect(pairPlayers(2)([player1, player2, player3])).toStrictEqual([
		[1, 2],
		[3, -1],
	]);
});

test("Round Robin completeness: all n*(n-1)/2 unique pairs appear exactly once (4 players)", () => {
	const players = [1, 2, 3, 4].map((id) => ({
		ID: id,
		name: `P${id}`,
		active: true,
	}));
	const numRounds = 3; // n-1 for even

	const allPairKeys = new Set<string>();
	for (let round = 0; round < numRounds; round++) {
		const pairings = pairPlayers(round)(players);
		for (const [a, b] of pairings) {
			if (b !== -1) {
				const key = [a, b].sort((x, y) => x - y).join("-");
				allPairKeys.add(key);
			}
		}
	}

	// 4 players → 4*3/2 = 6 unique pairs
	expect(allPairKeys.size).toBe(6);
});

test("Round Robin completeness: all unique pairs appear exactly once (6 players)", () => {
	const players = [1, 2, 3, 4, 5, 6].map((id) => ({
		ID: id,
		name: `P${id}`,
		active: true,
	}));
	const numRounds = 5; // n-1

	const pairCounts = new Map<string, number>();
	for (let round = 0; round < numRounds; round++) {
		const pairings = pairPlayers(round)(players);
		for (const [a, b] of pairings) {
			if (b !== -1) {
				const key = [a, b].sort((x, y) => x - y).join("-");
				pairCounts.set(key, (pairCounts.get(key) ?? 0) + 1);
			}
		}
	}

	// Every pair should appear exactly once
	for (const count of pairCounts.values()) {
		expect(count).toBe(1);
	}
	// 6 players → 6*5/2 = 15 unique pairs
	expect(pairCounts.size).toBe(15);
});
