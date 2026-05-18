import { getRanking, rankPlayers } from "./rank";
import type { Match, Player } from "turnament-scheduler";

const base = {
	active: true,
	gamesWon: 0,
	matchesLost: 0,
	omv: 0,
	buchholzCut1: 0,
	nps: 0,
	opponents: [],
};

test("rankPlayers (backgammon): sorts by matchesWon → nps → gamesWon", () => {
	const players = [
		{ ...base, ID: 1, name: "P1", matchesWon: 1, nps: 2, gamesWon: 2 },
		{ ...base, ID: 2, name: "P2", matchesWon: 1, nps: 2, gamesWon: 5 },
		{ ...base, ID: 3, name: "P3", matchesWon: 2, nps: 0, gamesWon: 10 },
	];
	expect(rankPlayers(players, "BACKGAMMON")).toMatchObject([{ ID: 3 }, { ID: 2 }, { ID: 1 }]);
});

test("rankPlayers (backgammon): default (no sportType) behaves as backgammon", () => {
	const players = [
		{ ...base, ID: 1, name: "P1", matchesWon: 1, nps: 5, gamesWon: 3 },
		{ ...base, ID: 2, name: "P2", matchesWon: 2, nps: 0, gamesWon: 10 },
	];
	expect(rankPlayers(players)).toMatchObject([{ ID: 2 }, { ID: 1 }]);
});

test("rankPlayers (chess): sorts by gamesWon → buchholzCut1 → matchesWon", () => {
	const players = [
		{ ...base, ID: 1, name: "P1", gamesWon: 6, buchholzCut1: 3, matchesWon: 2 },
		{ ...base, ID: 2, name: "P2", gamesWon: 6, buchholzCut1: 5, matchesWon: 1 },
		{ ...base, ID: 3, name: "P3", gamesWon: 4, buchholzCut1: 8, matchesWon: 3 },
	];
	expect(rankPlayers(players, "CHESS")).toMatchObject([{ ID: 2 }, { ID: 1 }, { ID: 3 }]);
});

test("rankPlayers (chess): matchesWon as final tiebreaker", () => {
	const players = [
		{ ...base, ID: 1, name: "P1", gamesWon: 4, buchholzCut1: 3, matchesWon: 1 },
		{ ...base, ID: 2, name: "P2", gamesWon: 4, buchholzCut1: 3, matchesWon: 2 },
	];
	expect(rankPlayers(players, "CHESS")).toMatchObject([{ ID: 2 }, { ID: 1 }]);
});

// ─── getRanking integration tests ───────────────────────────────────────────
// These test the full pipeline: Player[] + Match[] → sorted PlayerWithStats[]

const players: Player[] = [
	{ ID: 1, name: "P1", active: true },
	{ ID: 2, name: "P2", active: true },
	{ ID: 3, name: "P3", active: true },
	{ ID: 4, name: "P4", active: true },
];

// Two rounds of backgammon (5-point matches):
// Round 1: P1 beats P2 (5-2), P3 beats P4 (5-1)
// Round 2: P1 beats P3 (5-0), P2 beats P4 (5-3)
const backgammonMatches: Match[] = [
	{ ID: "r1m1", roundID: 1, pairing: [1, 2], result: [5, 2], hasBye: false },
	{ ID: "r1m2", roundID: 1, pairing: [3, 4], result: [5, 1], hasBye: false },
	{ ID: "r2m1", roundID: 2, pairing: [1, 3], result: [5, 0], hasBye: false },
	{ ID: "r2m2", roundID: 2, pairing: [2, 4], result: [5, 3], hasBye: false },
];

test("getRanking (backgammon): returns PlayerWithStats with correct stat fields", () => {
	const ranking = getRanking(players, backgammonMatches, "BACKGAMMON", 1);
	expect(ranking).toHaveLength(4);
	// All returned players should have stat fields
	for (const p of ranking) {
		expect(typeof p.omv).toBe("number");
		expect(typeof p.nps).toBe("number");
		expect(typeof p.buchholzCut1).toBe("number");
		expect(Number.isNaN(p.omv)).toBe(false);
		expect(Number.isNaN(p.nps)).toBe(false);
	}
});

test("getRanking (backgammon): primary sort is matchesWon", () => {
	const ranking = getRanking(players, backgammonMatches, "BACKGAMMON", 1);
	// P1: 2 wins, P2: 1 win, P3: 1 win, P4: 0 wins
	expect(ranking[0].ID).toBe(1); // only 2-win player
	expect(ranking[3].ID).toBe(4); // only 0-win player
});

test("getRanking (backgammon): NPS breaks tie between P2 and P3 (both 1 win)", () => {
	const ranking = getRanking(players, backgammonMatches, "BACKGAMMON", 1);
	// P2: scored 5+2=7, conceded 2+5=7? No: P2 scored 5 in r2, conceded 2 in r1.
	// P2 NPS: (2-5) + (5-3) = -3 + 2 = -1
	// P3 NPS: (5-1) + (0-5) = 4 + (-5) = -1
	// Both NPS = -1, so gamesWon breaks the tie
	// P2 gamesWon: 2+5=7, P3 gamesWon: 5+0=5 → P2 ranks above P3
	const p2rank = ranking.findIndex((p) => p.ID === 2);
	const p3rank = ranking.findIndex((p) => p.ID === 3);
	expect(p2rank).toBeLessThan(p3rank);
});

test("getRanking (backgammon): NPS values are correctly computed", () => {
	const ranking = getRanking(players, backgammonMatches, "BACKGAMMON", 1);
	const p1 = ranking.find((p) => p.ID === 1)!;
	// P1: (5-2) + (5-0) = 3 + 5 = 8
	expect(p1.nps).toBe(8);
});

// Two rounds of chess (Best of 4, scoringDivisor=2):
// Scores stored as doubled integers: win=2, draw=1+1, loss=0
// Round 1: P1 beats P2 (3-1 = 1.5–0.5), P3 beats P4 (4-0 = 2.0–0.0)
// Round 2: P1 draws P3 (2-2 = 1.0–1.0), P2 beats P4 (4-0 = 2.0–0.0)
const chessMatches: Match[] = [
	{ ID: "r1m1", roundID: 1, pairing: [1, 2], result: [6, 2], hasBye: false }, // 3–1 pts (1.5–0.5)
	{ ID: "r1m2", roundID: 1, pairing: [3, 4], result: [8, 0], hasBye: false }, // 4–0 pts (2.0–0.0)
	{ ID: "r2m1", roundID: 2, pairing: [1, 3], result: [4, 4], hasBye: false }, // 2–2 pts (1.0–1.0)
	{ ID: "r2m2", roundID: 2, pairing: [2, 4], result: [8, 0], hasBye: false }, // 4–0 pts (2.0–0.0)
];

test("getRanking (chess): primary sort is gamesWon (total points)", () => {
	const ranking = getRanking(players, chessMatches, "CHESS", 2);
	// P1: 6+4=10 raw pts, P3: 8+4=12, P2: 2+8=10, P4: 0
	// P3 ranks first (most points)
	expect(ranking[0].ID).toBe(3);
	// P4 ranks last (0 points)
	expect(ranking[3].ID).toBe(4);
});

test("getRanking (chess): stat fields are not NaN", () => {
	const ranking = getRanking(players, chessMatches, "CHESS", 2);
	for (const p of ranking) {
		expect(Number.isNaN(p.omv)).toBe(false);
		expect(Number.isNaN(p.nps)).toBe(false);
		expect(Number.isNaN(p.buchholzCut1)).toBe(false);
	}
});

test("getRanking (chess): NPS is normalised by scoringDivisor", () => {
	const ranking = getRanking(players, chessMatches, "CHESS", 2);
	const p3 = ranking.find((p) => p.ID === 3)!;
	// P3: (8-0)/2 + (4-4)/2 = 4 + 0 = 4.0
	expect(p3.nps).toBe(4);
});
