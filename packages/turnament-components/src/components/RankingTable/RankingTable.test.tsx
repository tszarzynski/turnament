import { page } from "@vitest/browser/context";
import type { PlayerWithStats } from "turnament-ranking";
import { render } from "vitest-browser-react";
import RankingTable from "./RankingTable";

const makePlayers = (
	overrides: Partial<PlayerWithStats>[] = [],
): PlayerWithStats[] =>
	overrides.map((o, i) => ({
		ID: i + 1,
		name: `Player ${i + 1}`,
		active: true,
		gamesWon: 0,
		matchesWon: 0,
		matchesLost: 0,
		opponents: [],
		omv: 0,
		buchholzCut1: 0,
		nps: 0,
		...o,
	}));

const columns = [
	{ label: "Wins", value: (p: PlayerWithStats) => p.matchesWon },
	{ label: "Losses", value: (p: PlayerWithStats) => p.matchesLost },
];

describe("RankingTable", () => {
	it("renders player names", async () => {
		render(
			<RankingTable
				playersWithStats={makePlayers([{ name: "Alice" }, { name: "Bob" }])}
				columns={columns}
			/>,
		);
		await expect.element(page.getByText("Alice")).toBeInTheDocument();
		await expect.element(page.getByText("Bob")).toBeInTheDocument();
	});

	it("renders rank numbers starting at 1", async () => {
		render(
			<RankingTable
				playersWithStats={makePlayers([{}, {}, {}])}
				columns={columns}
			/>,
		);
		const cells = await page.getByRole("cell").elements();
		const rankCells = cells.filter((c) =>
			["1", "2", "3"].includes(c.textContent?.trim() ?? ""),
		);
		expect(rankCells.length).toBe(3);
	});

	it("renders column headers", async () => {
		render(
			<RankingTable playersWithStats={makePlayers([{}])} columns={columns} />,
		);
		await expect
			.element(page.getByText("Wins", { exact: true }))
			.toBeInTheDocument();
		await expect
			.element(page.getByText("Losses", { exact: true }))
			.toBeInTheDocument();
	});

	it("renders column values from ColumnDef value function", async () => {
		render(
			<RankingTable
				playersWithStats={makePlayers([{ matchesWon: 7, matchesLost: 2 }])}
				columns={columns}
			/>,
		);
		await expect
			.element(page.getByRole("cell", { name: "7" }))
			.toBeInTheDocument();
		await expect
			.element(page.getByRole("cell", { name: "2" }))
			.toBeInTheDocument();
	});

	it("inactive players are rendered at reduced opacity", async () => {
		render(
			<RankingTable
				playersWithStats={makePlayers([{ name: "Ghost", active: false }])}
				columns={columns}
			/>,
		);
		const row = page.getByText("Ghost").element().closest("tr")!;
		await expect.element(row).toHaveClass("opacity-30");
	});

	it("does not show edit toggle when onDisablePlayerClick is not provided", async () => {
		render(
			<RankingTable playersWithStats={makePlayers([{}])} columns={columns} />,
		);
		await expect
			.element(page.getByTitle("Reorder list"))
			.not.toBeInTheDocument();
	});

	it("shows edit toggle when onDisablePlayerClick is provided", async () => {
		render(
			<RankingTable
				playersWithStats={makePlayers([{}])}
				columns={columns}
				onDisablePlayerClick={() => undefined}
			/>,
		);
		await expect.element(page.getByTitle("Reorder list")).toBeInTheDocument();
	});

	it("reveals remove buttons when edit mode is toggled on", async () => {
		render(
			<RankingTable
				playersWithStats={makePlayers([{ name: "Alice" }])}
				columns={columns}
				onDisablePlayerClick={() => undefined}
			/>,
		);
		await expect
			.element(page.getByTitle("Remove player"))
			.not.toBeInTheDocument();
		await page.getByTitle("Reorder list").click();
		await expect.element(page.getByTitle("Remove player")).toBeInTheDocument();
	});

	it("calls onDisablePlayerClick with the player when remove is clicked", async () => {
		const onDisablePlayerClick = vi.fn();
		const players = makePlayers([{ name: "Alice", ID: 42 }]);
		render(
			<RankingTable
				playersWithStats={players}
				columns={columns}
				onDisablePlayerClick={onDisablePlayerClick}
			/>,
		);
		await page.getByTitle("Reorder list").click();
		await page.getByTitle("Remove player").click();
		expect(onDisablePlayerClick).toHaveBeenCalledWith(
			expect.objectContaining({ ID: 42 }),
		);
	});

	it("does not show remove button for inactive players in edit mode", async () => {
		render(
			<RankingTable
				playersWithStats={makePlayers([
					{ name: "Active", active: true },
					{ name: "Inactive", active: false },
				])}
				columns={columns}
				onDisablePlayerClick={() => undefined}
			/>,
		);
		await page.getByTitle("Reorder list").click();
		const removeButtons = await page.getByTitle("Remove player").elements();
		expect(removeButtons.length).toBe(1);
	});
});
