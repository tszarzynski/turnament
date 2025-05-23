import { render } from "vitest-browser-react";
import type { PlayerWithStats } from "turnament-scheduler";
import RankingTable from "./RankingTable";

const playersWithStats: PlayerWithStats[] = [
	{
		ID: 1,
		name: "John Doe",
		active: true,
		gamesWon: 5,
		matchesLost: 6,
		matchesWon: 7,
		omv: 12.34,
		opponents: [],
	},
	{
		ID: 2,
		name: "Jane Smith",
		active: true,
		gamesWon: 8,
		matchesLost: 3,
		matchesWon: 9,
		omv: 15.21,
		opponents: [],
	},
	{
		ID: 3,
		name: "Mike Johnson",
		active: false,
		gamesWon: 4,
		matchesLost: 8,
		matchesWon: 4,
		omv: 10.76,
		opponents: [],
	},
	{
		ID: 4,
		name: "Emily Williams",
		active: true,
		gamesWon: 10,
		matchesLost: 2,
		matchesWon: 11,
		omv: 17.45,
		opponents: [],
	},
	{
		ID: 5,
		name: "Alex Brown",
		active: true,
		gamesWon: 7,
		matchesLost: 5,
		matchesWon: 6,
		omv: 13.89,
		opponents: [],
	},
	{
		ID: 6,
		name: "Sarah Davis",
		active: false,
		gamesWon: 3,
		matchesLost: 9,
		matchesWon: 3,
		omv: 9.52,
		opponents: [],
	},
];

describe("RankingTable", () => {
	it("renders without error", () => {
		const { asFragment } = render(
			<RankingTable playersWithStats={playersWithStats} />,
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
