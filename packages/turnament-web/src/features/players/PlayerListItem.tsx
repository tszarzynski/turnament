import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconButton, IconDrag, IconRemove } from "turnament-components";

type Props = {
	name: string;
	index: number;
	rank: number;
	draggable: boolean;
	removePlayer: (id: number) => void;
};

const PlayerListItem = ({
	name,
	index,
	rank,
	draggable,
	removePlayer,
}: Props) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: index, disabled: !draggable });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		...(isDragging && { position: "relative" as const, zIndex: 1 }),
	};

	return (
		<div ref={setNodeRef} style={style} className="table-row">
			{draggable && (
				<div
					className="table-cell w-[54px] touch-none"
					{...listeners}
					{...attributes}
				>
					<IconButton iconSlot={<IconDrag />} />
				</div>
			)}
			<div className="table-cell w-[54px] border border-secondary px-4 py-1 text-center text-secondary">
				{rank}
			</div>
			<div className="letter-spacing-[4px] table-cell border border-secondary px-4 py-1 font-bold text-2xl text-handwritten">
				{name}
			</div>
			<div className="table-cell w-[54px]">
				<IconButton
					variant="secondary"
					iconSlot={<IconRemove />}
					onClick={() => removePlayer(index)}
					title="Remove player"
					shape="circle"
				/>
			</div>
		</div>
	);
};

export default PlayerListItem;
