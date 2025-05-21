import { makePlayersWithResults, makePlayersWithStats } from "./players";
import type { Match } from "./types";

test("makePlayersWithResults", () => {
	const players = [
		{
			ID: 1,
			name: "Player 1",
			active: true,
		},
		{
			ID: 2,
			name: "Player 2",
			active: true,
		},
	];
	const rounds: Match[] = [
		{
			ID: "123",
			roundID: 1,
			pairing: [1, 2],
			result: [2, 0],
			hasBye: false,
		},
		{
			ID: "456",
			roundID: 2,
			pairing: [1, 2],
			result: [1, 2],
			hasBye: false,
		},
	];

	const results = [
		{
			ID: 1,
			name: "Player 1",
			active: true,
			gamesWon: 3,
			matchesWon: 1,
			matchesLost: 1,
			opponents: [2, 2],
		},
		{
			ID: 2,
			name: "Player 2",
			active: true,
			gamesWon: 2,
			matchesWon: 1,
			matchesLost: 1,
			opponents: [1, 1],
		},
	];

	expect(makePlayersWithResults(players, rounds)).toMatchObject(results);
});

test("makePlayersWithStats", () => {
	const players = [
		{
			ID: 1,
			name: "Player 1",
			active: true,
			gamesWon: 3,
			matchesWon: 1,
			matchesLost: 1,
			opponents: [2, 2],
		},
		{
			ID: 2,
			name: "Player 2",
			active: true,
			gamesWon: 2,
			matchesWon: 1,
			matchesLost: 1,
			opponents: [1, 1],
		},
	];

	const results = [
		{
			ID: 1,
			name: "Player 1",
			active: true,
			gamesWon: 3,
			matchesWon: 1,
			matchesLost: 1,
			opponents: [2, 2],
			omv: 0.5,
		},
		{
			ID: 2,
			name: "Player 2",
			active: true,
			gamesWon: 2,
			matchesWon: 1,
			matchesLost: 1,
			opponents: [1, 1],
			omv: 0.5,
		},
	];

	expect(makePlayersWithStats(players)).toMatchObject(results);
});
