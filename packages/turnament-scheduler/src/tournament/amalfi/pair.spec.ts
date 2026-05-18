import { pairPlayers, toPairs } from "./pair";
import { BYE_ID } from "../../consts";

// ─── toPairs ────────────────────────────────────────────────────────────────

test("toPairs: even count, offset 2 → pairs [0,2] and [1,3]", () => {
	expect(toPairs([10, 20, 30, 40], 2)).toStrictEqual([
		[10, 30],
		[20, 40],
	]);
});

test("toPairs: even count, offset 1 → adjacent pairs", () => {
	expect(toPairs([1, 2, 3, 4], 1)).toStrictEqual([
		[1, 2],
		[2, 3],
		[3, 4],
	]);
});

test("toPairs: offset clamped to array length - 1 when too large", () => {
	// 4 elements, offset 10 → clamped to 3 → only pair [0,3]
	expect(toPairs([1, 2, 3, 4], 10)).toStrictEqual([[1, 4]]);
});

test("toPairs: odd count → first element gets bye, rest paired", () => {
	// 5 elements → bye=arr[0], fold remaining 4 with offset
	const result = toPairs([1, 2, 3, 4, 5], 2);
	expect(result[0]).toStrictEqual([1, BYE_ID]);
	expect(result.length).toBeGreaterThan(1);
});

test("toPairs: 2 elements → single pair", () => {
	expect(toPairs([1, 2], 1)).toStrictEqual([[1, 2]]);
});

// ─── pairPlayers ────────────────────────────────────────────────────────────

const makePlayer = (id: number, matchesWon: number, gamesWon: number, opponents: number[]) => ({
	ID: id,
	name: `P${id}`,
	active: true,
	matchesWon,
	matchesLost: 0,
	gamesWon,
	opponents,
});

test("pairPlayers: round 1 with 4 players (even) → max offset, no bye", () => {
	// roundsNeeded(4) = 3, numPlayedRounds = 0, offset = 3
	// sorted by standing (all equal → original order preserved)
	const players = [
		makePlayer(1, 0, 0, []),
		makePlayer(2, 0, 0, []),
		makePlayer(3, 0, 0, []),
		makePlayer(4, 0, 0, []),
	];
	const pairings = pairPlayers(players);
	// offset=3 on 4 elements → clamped to 3 → pair [0,3] only → [P1,P4]
	expect(pairings).toStrictEqual([[1, 4]]);
});

test("pairPlayers: round 1 with 6 players (even) → offset 4, two pairs", () => {
	// roundsNeeded(6) = 4, offset = 4, safeOffset = min(4,5) = 4
	// pairs: [0+4]=P1 vs P5, [1+4]=P2 vs P6
	const players = [
		makePlayer(1, 0, 0, []),
		makePlayer(2, 0, 0, []),
		makePlayer(3, 0, 0, []),
		makePlayer(4, 0, 0, []),
		makePlayer(5, 0, 0, []),
		makePlayer(6, 0, 0, []),
	];
	const pairings = pairPlayers(players);
	expect(pairings).toStrictEqual([[1, 5], [2, 6]]);
});

test("pairPlayers: odd player count → bye assigned to first in sorted order", () => {
	// roundsNeeded(3) = ceil(log2(3)+1) = ceil(1.58+1) = 3, offset = 3 → clamped to 1 on 2 remaining
	const players = [
		makePlayer(1, 0, 0, []),
		makePlayer(2, 0, 0, []),
		makePlayer(3, 0, 0, []),
	];
	const pairings = pairPlayers(players);
	// First sorted player gets bye; remaining 2 paired
	const byePairing = pairings.find((p) => p.includes(BYE_ID));
	expect(byePairing).toBeDefined();
	expect(pairings.length).toBe(2); // 1 real pair + 1 bye
});

test("pairPlayers: sorts by standing before pairing", () => {
	// P2 has more wins → ranked first → gets bye when odd
	const players = [
		makePlayer(1, 0, 0, []),
		makePlayer(2, 3, 10, [3, 4, 5]), // top ranked
		makePlayer(3, 1, 3, [2]),
	];
	const pairings = pairPlayers(players);
	// Top player (P2) should be first in sorted order → receives bye
	const byePairing = pairings.find((p) => p.includes(BYE_ID));
	expect(byePairing?.[0]).toBe(2);
});

test("pairPlayers: round 2 uses smaller offset than round 1", () => {
	// After round 1 (opponents.length=1), offset shrinks by 1
	const playersRound2 = [
		makePlayer(1, 1, 5, [4]),
		makePlayer(2, 1, 4, [3]),
		makePlayer(3, 0, 3, [2]),
		makePlayer(4, 0, 2, [1]),
	];
	const round1Players = [
		makePlayer(1, 0, 0, []),
		makePlayer(2, 0, 0, []),
		makePlayer(3, 0, 0, []),
		makePlayer(4, 0, 0, []),
	];
	const round1Pairings = pairPlayers(round1Players);
	const round2Pairings = pairPlayers(playersRound2);
	// Round 2 should produce more matches than round 1 (smaller offset = more pairs)
	expect(round2Pairings.length).toBeGreaterThan(round1Pairings.length);
});
