import { filterActivePlayers, makePlayersWithResults } from "./players";
import type { Match } from "./types";

test("makePlayersWithResults", () => {
	const players = [
		{ ID: 1, name: "Player 1", active: true },
		{ ID: 2, name: "Player 2", active: true },
	];
	const rounds: Match[] = [
		{ ID: "123", roundID: 1, pairing: [1, 2], result: [2, 0], hasBye: false },
		{ ID: "456", roundID: 2, pairing: [1, 2], result: [1, 2], hasBye: false },
	];

	expect(makePlayersWithResults(players, rounds)).toMatchObject([
		{ ID: 1, gamesWon: 3, matchesWon: 1, matchesLost: 1, opponents: [2, 2] },
		{ ID: 2, gamesWon: 2, matchesWon: 1, matchesLost: 1, opponents: [1, 1] },
	]);
});

test("makePlayersWithResults: bye does not count as a loss", () => {
	const players = [
		{ ID: 1, name: "Player 1", active: true },
		{ ID: 2, name: "Player 2", active: true },
	];
	const rounds: Match[] = [
		{ ID: "bye", roundID: 1, pairing: [1, -1], result: [0, 0], hasBye: true },
		{ ID: "match", roundID: 2, pairing: [1, 2], result: [0, 3], hasBye: false },
	];

	const results = makePlayersWithResults(players, rounds);
	// Player 1: 1 bye win + 1 real loss → matchesWon=1, matchesLost=1
	expect(results[0]).toMatchObject({ matchesWon: 1, matchesLost: 1 });
});

test("filterActivePlayers: keeps only active players", () => {
	const players = [
		{ ID: 1, name: "P1", active: true },
		{ ID: 2, name: "P2", active: false },
		{ ID: 3, name: "P3", active: true },
	];
	const result = filterActivePlayers(players);
	expect(result.map((p) => p.ID)).toStrictEqual([1, 3]);
});

test("filterActivePlayers: returns empty array when all inactive", () => {
	const players = [
		{ ID: 1, name: "P1", active: false },
		{ ID: 2, name: "P2", active: false },
	];
	expect(filterActivePlayers(players)).toStrictEqual([]);
});

test("filterActivePlayers: returns all when all active", () => {
	const players = [
		{ ID: 1, name: "P1", active: true },
		{ ID: 2, name: "P2", active: true },
	];
	expect(filterActivePlayers(players)).toHaveLength(2);
});
