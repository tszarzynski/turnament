import { useMemo } from "react";
import { useToggle } from "react-use";
import type { Player, PlayerWithStats } from "turnament-scheduler";
import Hr from "../Hr";
import IconButton from "../IconButton";
import IconEdit from "../IconEdit";
import IconRemove from "../IconRemove";
import ToggleButton from "../ToggleButton";

type Props = {
	playersWithStats: PlayerWithStats[];
	onDisablePlayerClick: (player: Pick<Player, "ID">) => void;
};

const RankingTable = ({ playersWithStats, onDisablePlayerClick }: Props) => {
	const [isEditing, toggleIsEditing] = useToggle(false);

	const columns = useMemo(
		() =>
			isEditing
				? ["Rank", "Name", "Wins", "Pts", "OMV", ""]
				: ["Rank", "Name", "Wins", "Pts", "OMV"],
		[isEditing],
	);

	return (
		<div className="w-full border-2 border-secondary p-0.5">
			<Hr />
			<table className="min-w-full table-auto border-separate border-spacing-0.5">
				<TableHead columns={columns} />
				<tbody>
					{playersWithStats.map((player, index) => (
						<tr
							key={player.ID}
							className={`h-[54px] align-bottom ${player.active ? "opacity-100" : "opacity-30"}`}
						>
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
							{isEditing && player.active && (
								<td className="table-cell w-[54px]">
									<IconButton
										variant="secondary"
										iconSlot={<IconRemove />}
										onClick={() => onDisablePlayerClick(player)}
										title="Remove player"
										shape="circle"
									/>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
			<Hr />
			<div className="flex w-full flex-row items-center justify-between px-0.5 py-4 ">
				{/* Toggle switch with label */}
				<ToggleButton
					// disabled={disabled}
					iconSlot={<IconEdit />}
					checked={isEditing}
					onChange={toggleIsEditing}
					title="Reorder list"
					shape="circle"
				/>
			</div>
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
							"border-2 border-secondary px-2 py-1 font-bold text-secondary text-upright text-xs empty:border-none"
						}
					>
						{column}
					</th>
				))}
			</tr>
		</thead>
	);
};
