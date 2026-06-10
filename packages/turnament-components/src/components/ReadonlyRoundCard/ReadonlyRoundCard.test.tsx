import { page } from "@vitest/browser/context";
import type { Match, Player } from "turnament-scheduler";
import { render } from "vitest-browser-react";
import ReadonlyRoundCard from "./ReadonlyRoundCard";

const players: Player[] = [
	{ ID: 1, name: "Alice", active: true },
	{ ID: 2, name: "Bob", active: true },
];

const match: Match = {
	ID: "m1",
	roundID: 1,
	hasBye: false,
	pairing: [1, 2],
	result: [0, 0],
};

describe("ReadonlyRoundCard", () => {
	it("displays the round number", async () => {
		render(
			<ReadonlyRoundCard matches={[match]} players={players} roundNum={3} />,
		);
		await expect.element(page.getByText("3")).toBeInTheDocument();
	});

	it("renders player names for each match", async () => {
		render(
			<ReadonlyRoundCard matches={[match]} players={players} roundNum={1} />,
		);
		await expect.element(page.getByText("Alice")).toBeInTheDocument();
		await expect.element(page.getByText("Bob")).toBeInTheDocument();
	});

	it("renders one match card per match", async () => {
		const matches: Match[] = [
			{ ID: "m1", roundID: 1, hasBye: false, pairing: [1, 2], result: [0, 0] },
			{ ID: "m2", roundID: 1, hasBye: false, pairing: [1, 2], result: [0, 0] },
			{ ID: "m3", roundID: 1, hasBye: false, pairing: [1, 2], result: [0, 0] },
		];
		render(
			<ReadonlyRoundCard matches={matches} players={players} roundNum={1} />,
		);
		const aliceOccurrences = await page.getByText("Alice").elements();
		expect(aliceOccurrences.length).toBe(3);
	});
});
