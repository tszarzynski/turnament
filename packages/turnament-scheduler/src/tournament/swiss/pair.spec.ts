import { scheduler } from ".";
import { makePlayersWithResults, filterActivePlayers } from "../../players";
import type { Match, Player } from "../../types";
import { pairPlayers } from "./pair";

test("pairPlayers should return correct pairings when tournament starts", () => {
	const player1 = {
		ID: 1,
		name: "Player 1",
		active: true,
		gamesWon: 0,
		matchesWon: 0,
		matchesLost: 0,
		omv: 0,
		opponents: [],
	};
	const player2 = {
		ID: 2,
		name: "Player 2",
		active: true,
		gamesWon: 0,
		matchesWon: 0,
		matchesLost: 0,
		omv: 0,
		opponents: [],
	};
	const player3 = {
		ID: 3,
		name: "Player 3",
		active: true,
		gamesWon: 0,
		matchesWon: 0,
		matchesLost: 0,
		omv: 0,
		opponents: [],
	};

	expect(pairPlayers([player1, player2, player3])).toStrictEqual([
		[1, 2],
		[3, -1],
	]);
});

test("pairPlayers should return correct pairings", () => {
	const player1 = {
		ID: 1,
		name: "Player 1",
		active: true,
		gamesWon: 2,
		matchesWon: 1,
		matchesLost: 0,
		omv: 0,
		opponents: [2],
	};
	const player2 = {
		ID: 2,
		name: "Player 2",
		active: true,
		gamesWon: 0,
		matchesWon: 0,
		matchesLost: 1,
		omv: 0,
		opponents: [1],
	};
	const player3 = {
		ID: 3,
		name: "Player 3",
		active: true,
		gamesWon: 0,
		matchesWon: 1,
		matchesLost: 0,
		omv: 0,
		opponents: [-1],
	};

	expect(pairPlayers([player1, player2, player3])).toStrictEqual([
		[1, 3],
		[2, -1],
	]);
});

test("Swiss multi-round: no pair appears more than once across 3 rounds (6 players)", () => {
	const players: Player[] = [1, 2, 3, 4, 5, 6].map((id) => ({
		ID: id,
		name: `P${id}`,
		active: true,
	}));

	const allMatches: Match[] = [];
	let roundID = 0;

	for (let round = 0; round < 3; round++) {
		roundID++;
		const playersWithResults = makePlayersWithResults(players, allMatches);
		const active = filterActivePlayers(playersWithResults);
		const pairings = pairPlayers(active);

		for (const [a, b] of pairings) {
			if (b !== -1) {
				allMatches.push({
					ID: `${roundID}-${a}-${b}`,
					roundID,
					pairing: [a, b],
					result: [5, 0],
					hasBye: false,
				});
			} else {
				allMatches.push({
					ID: `${roundID}-${a}-bye`,
					roundID,
					pairing: [a, b],
					result: [0, 0],
					hasBye: true,
				});
			}
		}
	}

	// Collect all real pairings as sorted pairs to check for duplicates
	const realMatches = allMatches.filter((m) => !m.hasBye);
	const pairKeys = realMatches.map(({ pairing: [a, b] }) =>
		[a, b].sort((x, y) => x - y).join("-"),
	);
	const uniquePairs = new Set(pairKeys);
	expect(uniquePairs.size).toBe(pairKeys.length);
});
