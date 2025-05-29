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
			<table className="min-w-full table-auto border-separate border-spacing-0.5">
				<TableHead columns={columns} />
				<tbody>
					{playersWithStats.map((player, index) => (
						<tr key={player.ID} className="h-[54px] align-bottom">
							<td className="align w-[54px] border border-secondary px-4 py-1 text-center text-secondary ">
								{index + 1}
							</td>
							<td className="border border-secondary px-4 py-1 font-bold text-2xl text-handwritten leading-none">
								{player.name}
							</td>
							<td className="border border-secondary px-4 py-1 text-handwritten">
								{player.matchesWon}
							</td>
							<td className="border border-secondary px-4 py-1 text-handwritten">
								{player.gamesWon}
							</td>
							<td className="border border-secondary px-4 py-1 text-handwritten">
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
		<thead>
			<tr>
				{columns.map((column) => (
					<th
						key={column}
						className={
							"border-2 border-secondary px-2 py-1 font-bold text-secondary text-upright text-xs"
						}
					>
						{column}
					</th>
				))}
			</tr>
		</thead>
	);
};
