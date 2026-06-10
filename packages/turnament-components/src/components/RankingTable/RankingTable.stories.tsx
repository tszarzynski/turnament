import type { PlayerWithStats } from "turnament-ranking";
import RankingTable, { type ColumnDef } from "./RankingTable";

export default {
	component: RankingTable,
	title: "RankingTable",
};

const columns: ColumnDef[] = [
	{ label: "W", value: (p) => p.matchesWon },
	{ label: "L", value: (p) => p.matchesLost },
	{ label: "OMV", value: (p) => p.omv.toFixed(2) },
];

const players: PlayerWithStats[] = [
	{ ID: 1, name: "John Doe",       active: true,  gamesWon: 5,  matchesWon: 7,  matchesLost: 6, omv: 12.34, buchholzCut1: 8.5,  nps: 3, opponents: [] },
	{ ID: 2, name: "Jane Smith",     active: true,  gamesWon: 8,  matchesWon: 9,  matchesLost: 3, omv: 15.21, buchholzCut1: 11.0, nps: 5, opponents: [] },
	{ ID: 3, name: "Mike Johnson",   active: false, gamesWon: 4,  matchesWon: 4,  matchesLost: 8, omv: 10.76, buchholzCut1: 7.0,  nps: 1, opponents: [] },
	{ ID: 4, name: "Emily Williams", active: true,  gamesWon: 10, matchesWon: 11, matchesLost: 2, omv: 17.45, buchholzCut1: 13.5, nps: 7, opponents: [] },
	{ ID: 5, name: "Alex Brown",     active: true,  gamesWon: 7,  matchesWon: 6,  matchesLost: 5, omv: 13.89, buchholzCut1: 9.5,  nps: 4, opponents: [] },
	{ ID: 6, name: "Sarah Davis",    active: false, gamesWon: 3,  matchesWon: 3,  matchesLost: 9, omv: 9.52,  buchholzCut1: 6.0,  nps: 0, opponents: [] },
];

export const Default = () => (
	<RankingTable playersWithStats={players} columns={columns} />
);

export const WithRemove = () => (
	<RankingTable
		playersWithStats={players}
		columns={columns}
		onDisablePlayerClick={(p) => alert(`Remove player ${p.ID}`)}
	/>
);
