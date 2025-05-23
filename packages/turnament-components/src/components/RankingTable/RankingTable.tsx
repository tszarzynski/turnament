import type { PlayerWithStats } from "turnament-scheduler";
import Hr from "../Hr";

type Props = {
	playersWithStats: PlayerWithStats[];
};

const columns = ["Rank", "Name", "Wins", "Pts", "OMV"];

const RankingTable = ({ playersWithStats }: Props) => {
	return (
		<div className="w-full border-2 border-secondary p-0.5">
			<Hr />
			<table className="min-w-full border-spacing-0.5 border-separate table-auto">
				<TableHead columns={columns} />
				<tbody>
					{playersWithStats.map((player, index) => (
						<tr key={player.ID}>
							<td className="py-3 px-4 border border-secondary text-secondary text-center">
								{index + 1}
							</td>
							<td className="py-3 px-4 border border-secondary font-bold">
								{player.name}
							</td>
							<td className="py-3 px-4 border border-secondary">
								{player.matchesWon}
							</td>
							<td className="py-3 px-4 border border-secondary">
								{player.gamesWon}
							</td>
							<td className="py-3 px-4 border border-secondary">
								{player.omv.toFixed(2)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default RankingTable;

const TableHead = ({ columns }: { columns: string[] }) => {
	return (
		<thead className="border border-secondary">
			<tr>
				{columns.map((column) => (
					<th
						key={column}
						className={
							"text-upright text-secondary text-xs py-2 px-4 font-bold uppercase border border-secondary [letter-spacing:-4px]"
						}
					>
						{column}
					</th>
				))}
			</tr>
		</thead>
	);
};
