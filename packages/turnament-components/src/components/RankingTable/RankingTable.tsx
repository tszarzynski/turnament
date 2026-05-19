import { useToggle } from "react-use";
import type { Player } from "turnament-scheduler";
import type { PlayerWithStats } from "turnament-ranking";
import Hr from "../Hr";
import IconButton from "../IconButton";
import IconEdit from "../IconEdit";
import IconRemove from "../IconRemove";
import ToggleButton from "../ToggleButton";

export type ColumnDef = {
	label: string;
	value: (player: PlayerWithStats) => string | number;
};

type Props = {
	playersWithStats: PlayerWithStats[];
	columns: ColumnDef[];
	onDisablePlayerClick?: (player: Pick<Player, "ID">) => void;
};

const RankingTable = ({ playersWithStats, columns, onDisablePlayerClick }: Props) => {
	const [isEditing, toggleIsEditing] = useToggle(false);

	const headings = ["Rank", "Name", ...columns.map((c) => c.label), ...(isEditing ? [""] : [])];

	return (
		<div className="w-full border-2 border-secondary p-0.5">
			<Hr />
			<table className="min-w-full table-auto border-separate border-spacing-0.5">
				<TableHead columns={headings} />
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
							{columns.map((col) => (
								<td key={col.label} className="border border-secondary px-4 py-1 text-handwritten">
									{col.value(player)}
								</td>
							))}
							{isEditing && onDisablePlayerClick && player.active && (
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
			{onDisablePlayerClick && (
				<>
					<Hr />
					<div className="flex w-full flex-row items-center justify-between px-0.5 py-4 ">
						<ToggleButton
							iconSlot={<IconEdit />}
							checked={isEditing}
							onChange={toggleIsEditing}
							title="Reorder list"
							shape="circle"
						/>
					</div>
				</>
			)}
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
						className="border-2 border-secondary px-2 py-1 font-bold text-secondary text-upright text-tiny empty:border-none"
					>
						{column}
					</th>
				))}
			</tr>
		</thead>
	);
};
