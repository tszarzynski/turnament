import { rankPlayers } from "./rank";

test("rankPlayers should return correct value", () => {
	const players = [
		{
			ID: 1,
			name: "Player 1",
			active: true,
			gamesWon: 2,
			matchesWon: 1,
			matchesLost: 1,
			omv: 0.75,
			opponents: [2, 3],
		},
		{
			ID: 2,
			name: "Player 2",
			active: true,
			gamesWon: 1,
			matchesWon: 1,
			matchesLost: 1,
			omv: 0.25,
			opponents: [1, -1],
		},
		{
			ID: 3,
			name: "Player 3",
			active: true,
			gamesWon: 2,
			matchesWon: 2,
			matchesLost: 0,
			omv: 0.25,
			opponents: [-1, 1],
		},
	];
	expect(rankPlayers(players)).toMatchObject([{ ID: 3 }, { ID: 1 }, { ID: 2 }]);
});
