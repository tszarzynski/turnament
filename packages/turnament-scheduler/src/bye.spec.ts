import {
	nominateStrongestPlayerForBye,
	nominateWeakestPlayerForBye,
} from "./bye";

test("nominateWeakestPlayerForBye should return -1 for even number of players", () => {
	const players = [
		{
			ID: 1,
			name: "Player 1",
			active: true,
			gamesWon: 0,
			matchesWon: 0,
			matchesLost: 0,
			omv: 0,
			opponents: [],
		},
		{
			ID: 2,
			name: "Player 2",
			active: true,
			gamesWon: 0,
			matchesWon: 0,
			matchesLost: 0,
			omv: 0,
			opponents: [],
		},
	];
	expect(nominateWeakestPlayerForBye(players)).toBe(-1);
});

test("nominateWeakestPlayerForBye should return last player with smallest BYE number", () => {
	const players = [
		{
			ID: 1,
			name: "Player 1",
			active: true,
			gamesWon: 1,
			matchesWon: 1,
			matchesLost: 0,
			omv: 0,
			opponents: [2],
		},
		{
			ID: 2,
			name: "Player 2",
			active: true,
			gamesWon: 0,
			matchesWon: 0,
			matchesLost: 1,
			omv: 0,
			opponents: [1],
		},
		{
			ID: 3,
			name: "Player 3",
			active: true,
			gamesWon: 0,
			matchesWon: 0,
			matchesLost: 0,
			omv: 0,
			opponents: [-1],
		},
	];
	expect(nominateWeakestPlayerForBye(players)).toBe(2);
});

test("nominateStrongestPlayerForBye should return -1 for even number of players", () => {
	const players = [
		{
			ID: 1,
			name: "Player 1",
			active: true,
			gamesWon: 0,
			matchesWon: 0,
			matchesLost: 0,
			omv: 0,
			opponents: [],
		},
		{
			ID: 2,
			name: "Player 2",
			active: true,
			gamesWon: 0,
			matchesWon: 0,
			matchesLost: 0,
			omv: 0,
			opponents: [],
		},
	];
	expect(nominateStrongestPlayerForBye(players)).toBe(-1);
});

test("nominateStrongestPlayerForBye should return last player with smallest BYE number", () => {
	const players = [
		{
			ID: 1,
			name: "Player 1",
			active: true,
			gamesWon: 1,
			matchesWon: 1,
			matchesLost: 0,
			omv: 0,
			opponents: [2],
		},
		{
			ID: 2,
			name: "Player 2",
			active: true,
			gamesWon: 0,
			matchesWon: 0,
			matchesLost: 1,
			omv: 0,
			opponents: [1],
		},
		{
			ID: 3,
			name: "Player 3",
			active: true,
			gamesWon: 0,
			matchesWon: 0,
			matchesLost: 0,
			omv: 0,
			opponents: [-1],
		},
	];
	expect(nominateStrongestPlayerForBye(players)).toBe(1);
});
