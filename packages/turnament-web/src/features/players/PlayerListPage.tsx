import { Reorder } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useToggle } from "react-use";
import {
	Button,
	IconButton,
	IconNext,
	IconReorder,
	IconShuffle,
	ToggleButton,
} from "turnament-components";
import { routes } from "../../app/router";
import { useBaseStore } from "../../app/store";
import PageHeader from "../../components/PageHeader";
import PlayerAddForm from "./PlayerAddForm";
import PlayerListItem from "./PlayerListItem";
import { useOrderedList } from "./hooks";
function shuffleArray(array: number[]) {
	const newArray = array.slice();

	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}

	return newArray;
}

const PlayerListPage = () => {
	const addPlayers = useBaseStore((state) => state.addPlayers);
	const players = useBaseStore((state) => state.players);

	const { items, order, set, add, remove, reorder, orderedItems } =
		useOrderedList<string>();
	const [manualSeeding, toggleManualSeeding] = useToggle(false);
	const [disabled, setDisabled] = useState(true);

	useEffect(
		() => set(Object.values(players).map((player) => player.name)),
		[players, set],
	);

	const handleNext = () => {
		addPlayers(orderedItems.map(({ item }) => ({ name: item })));
		routes.type().push();
	};

	const handleRandomize = () => {
		reorder(shuffleArray(order));
	};

	useEffect(() => {
		setDisabled(() => items.length < 2);
	}, [items]);

	const columns = useMemo(
		() => (manualSeeding ? ["", "Seed", "Name", ""] : ["Seed", "Name", ""]),
		[manualSeeding],
	);

	return (
		<div className="w-full p-1">
			<PageHeader>Choose Players</PageHeader>
			<div className="my-4 flex flex-col w-full border-2 border-secondary p-0.5">
				<hr className="border-secondary mb-0.5" />
				<div className="min-w-full border-spacing-0.5 border-separate table table-fixed relative">
					<div className="table-header-group border border-secondary">
						<div className="table-row">
							{columns.map((column, index) => (
								<div
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={`${column}${index}`}
									className={
										"table-cell text-upright text-secondary py-2 px-4 font-bold uppercase border border-secondary [letter-spacing:-4px] empty:border-none empty:w-[54px]"
									}
								>
									{column}
								</div>
							))}
						</div>
					</div>

					<Reorder.Group
						axis="y"
						as="div"
						values={order}
						onReorder={reorder}
						className="table-row-group"
					>
						{orderedItems.map(({ item, order }) => (
							<PlayerListItem
								name={item}
								draggable={manualSeeding}
								index={order}
								key={order}
								removePlayer={remove}
							/>
						))}
						<PlayerAddForm addPlayer={add} draggable={manualSeeding} />
					</Reorder.Group>
				</div>

				<hr className="border-secondary mb-0.5" />
				<div className="w-full flex flex-row justify-between items-center p-0.5 ">
					{/* Toggle switch with label */}
					<ToggleButton
						disabled={disabled}
						iconSlot={<IconReorder />}
						checked={manualSeeding}
						onChange={toggleManualSeeding}
						title="Reorder list"
					/>

					{/* Randomize button */}
					<IconButton
						type="button"
						variant="secondary"
						disabled={manualSeeding || disabled}
						onClick={handleRandomize}
						iconSlot={<IconShuffle />}
						className="mr-3"
						title="Shuffle list"
					/>
				</div>
			</div>

			<div className="my-4">
				<Button
					fullWidth={true}
					iconSlot={<IconNext />}
					disabled={disabled}
					onClick={handleNext}
				>
					Next
				</Button>
			</div>
		</div>
	);
};

export default PlayerListPage;
