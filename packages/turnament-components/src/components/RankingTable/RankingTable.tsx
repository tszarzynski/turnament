import { useToggle } from "react-use";
import type { PlayerWithStats } from "turnament-ranking";
import type { Player } from "turnament-scheduler";
import Hr from "../Hr";
import IconButton from "../IconButton";
import IconEdit from "../IconEdit";
import IconInfo from "../IconInfo";
import IconRemove from "../IconRemove";
import ToggleButton from "../ToggleButton";
import Tooltip from "../Tooltip";

export type ColumnDef = {
	label: string;
	value: (player: PlayerWithStats) => string | number;
	description?: string;
};

type Props = {
	playersWithStats: PlayerWithStats[];
	columns: ColumnDef[];
	onDisablePlayerClick?: (player: Pick<Player, "ID">) => void;
};

const RankingTable = ({
	playersWithStats,
	columns,
	onDisablePlayerClick,
}: Props) => {
	const [isEditing, toggleIsEditing] = useToggle(false);

	const columnsWithDescription = columns.filter((c) => c.description);

	const headings = [
		{ label: "Rank" },
		{ label: "Name" },
		...columns.map((c) => ({ label: c.label, description: c.description })),
		...(isEditing ? [{ label: "" }] : []),
	];

	return (
		<div className="w-full border-2 border-secondary p-0.5">
			<Hr />
			<table className="min-w-full table-auto border-separate border-spacing-0.5">
				<TableHead headings={headings} />
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
								<td
									key={col.label}
									className="border border-secondary px-4 py-1 text-handwritten"
								>
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
						{columnsWithDescription.length > 0 && (
							<Tooltip
								content={
									<div className="flex flex-col gap-2">
										<p className="font-bold text-tiny uppercase tracking-widest">Ranking criteria</p>
										<ol className="flex flex-col gap-1">
											{columnsWithDescription.map((c, i) => (
												<li key={c.label}>
													<span className="font-bold">{i + 1}. {c.label}</span> — {c.description}
												</li>
											))}
										</ol>
									</div>
								}
								position="left"
							>
								<div className="border rounded-full text-secondary hover:bg-white">
									<i className="h-10 w-10 flex items-center justify-center">
										<IconInfo />
									</i>
								</div>
							</Tooltip>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default RankingTable;

const TableHead = ({ headings }: { headings: { label: string; description?: string }[] }) => {
	return (
		<thead>
			<tr>
				{headings.map(({ label, description }) => (
					<th
						key={label}
						title={description}
						className="border-2 border-secondary px-2 py-1 font-bold text-secondary text-upright text-tiny empty:border-none"
					>
						{label}
					</th>
				))}
			</tr>
		</thead>
	);
};
