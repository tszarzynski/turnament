import { calcOMV } from "./omv";

test("calcOMV should return correct value", () => {
	const players = [
		{
			ID: 1,
			name: "Player 1",
			active: true,
			gamesWon: 2,
			matchesWon: 1,
			matchesLost: 0,
			omv: 0,
			opponents: [2],
		},
		{
			ID: 2,
			name: "Player 2",
			active: true,
			gamesWon: 1,
			matchesWon: 0,
			matchesLost: 1,
			omv: 0,
			opponents: [1],
		},
	];
	expect(calcOMV(players, players[0])).toBe(0);
	expect(calcOMV(players, players[1])).toBe(1);
});

test("calcOMV should return correct value with byes", () => {
	const players = [
		{
			ID: 1,
			name: "Player 1",
			active: true,
			gamesWon: 2,
			matchesWon: 1,
			matchesLost: 1,
			omv: 0,
			opponents: [2, 3],
		},
		{
			ID: 2,
			name: "Player 2",
			active: true,
			gamesWon: 1,
			matchesWon: 1,
			matchesLost: 1,
			omv: 0,
			opponents: [1, -1],
		},
		{
			ID: 3,
			name: "Player 3",
			active: true,
			gamesWon: 2,
			matchesWon: 2,
			matchesLost: 0,
			omv: 0,
			opponents: [-1, 1],
		},
	];
	expect(calcOMV(players, players[0])).toBe(0.75);
	expect(calcOMV(players, players[1])).toBe(0.5);
	expect(calcOMV(players, players[2])).toBe(0.5);
});

test("calcOMV: player whose only opponent is a bye returns 0, not NaN", () => {
	const players = [
		{
			ID: 1,
			name: "P1",
			active: true,
			gamesWon: 0,
			matchesWon: 1,
			matchesLost: 0,
			omv: 0,
			opponents: [-1], // only a bye
		},
	];
	const result = calcOMV(players, players[0]);
	expect(result).toBe(0);
	expect(Number.isNaN(result)).toBe(false);
});

test("calcOMV: undefeated opponent gives ratio of 1.0", () => {
	const players = [
		{
			ID: 1,
			name: "P1",
			active: true,
			gamesWon: 0,
			matchesWon: 0,
			matchesLost: 1,
			omv: 0,
			opponents: [2],
		},
		{
			ID: 2,
			name: "P2",
			active: true,
			gamesWon: 5,
			matchesWon: 3,
			matchesLost: 0, // undefeated → ratio 3/(3+0) = 1.0
			omv: 0,
			opponents: [1],
		},
	];
	expect(calcOMV(players, players[0])).toBe(1);
});
