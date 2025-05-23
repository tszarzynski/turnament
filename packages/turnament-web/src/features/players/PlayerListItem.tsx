import { motion, Reorder, useDragControls } from "framer-motion";
import { IconButton, IconDrag, IconRemove } from "turnament-components";

const draggableVariants = {
	draggable: { width: "auto", opacity: 1 },
	notDraggable: { width: 0, opacity: 0 },
};

type Props = {
	name: string;
	index: number;
	draggable: boolean;
	removePlayer: (id: number) => void;
};

const PlayerListItem = ({ name, index, draggable, removePlayer }: Props) => {
	const controls = useDragControls();

	return (
		<Reorder.Item
			as="div"
			value={index}
			dragListener={false}
			dragControls={controls}
			className="table-row"
		>
			{draggable && (
				<motion.div
					initial="notDraggable"
					animate={draggable ? "draggable" : "notDraggable"}
					variants={draggableVariants}
					className="table-cell w-[54px]"
					onPointerDown={(e) => controls.start(e)}
				>
					<IconButton iconSlot={<IconDrag />} />
				</motion.div>
			)}
			<div className="table-cell w-[54px] border border-secondary px-4 py-1 text-center text-secondary">
				{index + 1}
			</div>
			<div className="table-cell border border-secondary px-4 py-1 font-bold text-lg">
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
		</Reorder.Item>
	);
};

export default PlayerListItem;
