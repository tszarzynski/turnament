import { Reorder } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useToggle } from "react-use";
import {
	Button,
	Hr,
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
import PageNavigation from "../../components/PageNavigation";
import PageLayout, { PageBody, PageContent } from "../../components/PageLayout";
import { shuffle } from "es-toolkit";

const PlayersPage = () => {
	const setPlayers = useBaseStore((state) => state.setPlayers);
	const players = useBaseStore((state) => state.players);

	const { items, order, set, add, remove, reorder, orderedItems } =
		useOrderedList<string>();
	const [manualSeeding, toggleManualSeeding] = useToggle(false);
	const [disabled, setDisabled] = useState(true);

	useEffect(() => set(players.map((player) => player.name)), [players, set]);

	const handleNext = () => {
		setPlayers(orderedItems.map(({ item }) => ({ name: item })));
		routes.type().push();
	};

	const handleRandomize = () => {
		reorder(shuffle(order));
	};

	useEffect(() => {
		setDisabled(() => items.length < 2);
	}, [items]);

	const columns = useMemo(
		() => (manualSeeding ? ["", "Seed", "Name", ""] : ["Seed", "Name", ""]),
		[manualSeeding],
	);

	return (
		<PageLayout>
			<PageContent>
				<PageHeader>Choose Players</PageHeader>
				<PageBody>
					<div className="flex w-full flex-col border-2 border-secondary p-0.5">
						<Hr />
						<div className="relative table min-w-full table-fixed border-separate border-spacing-0.5">
							<div className="table-header-group border border-secondary">
								<div className="table-row">
									{columns.map((column, index) => (
										<div
											key={`${index}${column}`}
											className={
												"table-cell border border-secondary px-2 py-1 font-bold text-secondary text-upright text-xs uppercase empty:w-[54px] empty:border-none"
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
								className="table-row-group overflow-hidden overscroll-y-none"
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

						<Hr />
						<div className="flex w-full flex-row items-center justify-between px-0.5 py-4 ">
							{/* Toggle switch with label */}
							<ToggleButton
								disabled={disabled}
								iconSlot={<IconReorder />}
								checked={manualSeeding}
								onChange={toggleManualSeeding}
								title="Reorder list"
								shape="circle"
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
				</PageBody>
			</PageContent>
			<PageNavigation>
				<Button
					iconSlot={<IconNext />}
					disabled={disabled}
					onClick={handleNext}
				>
					Next
				</Button>
			</PageNavigation>
		</PageLayout>
	);
};

export default PlayersPage;
