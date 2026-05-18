import { calcNPS } from "./nps";
import type { Match } from "turnament-scheduler";

const player = {
	ID: 1,
	name: "Player 1",
	active: true,
	gamesWon: 0,
	matchesWon: 0,
	matchesLost: 0,
	omv: 0,
	buchholzCut1: 0,
	nps: 0,
	opponents: [],
};

test("calcNPS returns correct point differential", () => {
	const matches: Match[] = [
		{ ID: "a", roundID: 1, pairing: [1, 2], result: [5, 3], hasBye: false },
		{ ID: "b", roundID: 2, pairing: [3, 1], result: [2, 4], hasBye: false },
	];
	expect(calcNPS(player, matches)).toBe(4);
});

test("calcNPS returns negative spread when player loses points overall", () => {
	const matches: Match[] = [
		{ ID: "a", roundID: 1, pairing: [1, 2], result: [2, 5], hasBye: false },
		{ ID: "b", roundID: 2, pairing: [1, 3], result: [1, 3], hasBye: false },
	];
	expect(calcNPS(player, matches)).toBe(-5);
});

test("calcNPS excludes bye matches", () => {
	const matches: Match[] = [
		{ ID: "a", roundID: 1, pairing: [1, 2], result: [5, 3], hasBye: false },
		{ ID: "b", roundID: 2, pairing: [1, -1], result: [5, 0], hasBye: true },
	];
	expect(calcNPS(player, matches)).toBe(2);
});

test("calcNPS returns 0 with no matches", () => {
	expect(calcNPS(player, [])).toBe(0);
});

test("calcNPS normalises by scoringDivisor", () => {
	const matches: Match[] = [
		{ ID: "a", roundID: 1, pairing: [1, 2], result: [3, 1], hasBye: false },
	];
	// raw spread = 3 - 1 = 2; divided by 2 → 1.0
	expect(calcNPS(player, matches, 2)).toBe(1);
});

test("calcNPS: result is same regardless of which pairing position player occupies", () => {
	const matchAsFirst: Match[] = [
		{ ID: "a", roundID: 1, pairing: [1, 2], result: [5, 3], hasBye: false },
	];
	const matchAsSecond: Match[] = [
		{ ID: "a", roundID: 1, pairing: [2, 1], result: [3, 5], hasBye: false },
	];
	expect(calcNPS(player, matchAsFirst)).toBe(calcNPS(player, matchAsSecond));
});

test("calcNPS: draw match contributes zero spread", () => {
	const matches: Match[] = [
		{ ID: "a", roundID: 1, pairing: [1, 2], result: [4, 4], hasBye: false },
	];
	expect(calcNPS(player, matches)).toBe(0);
});
