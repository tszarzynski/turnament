import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";
import { useToggle } from "react-use";
import {
  Button,
  Hr,
  IconButton,
  IconNext,
  IconReorder,
  IconShuffle,
  IconUpload,
  ToggleButton,
} from "turnament-components";
import { routes } from "../../app/router";
import { useBaseStore } from "../../app/store";
import PageHeader from "../../components/PageHeader";
import PageLayout, { PageBody, PageContent } from "../../components/PageLayout";
import PageNavigation from "../../components/PageNavigation";
import PlayerAddForm from "./PlayerAddForm";
import PlayerListItem from "./PlayerListItem";
import { useOrderedList } from "./hooks";
import { useLoadTournament } from "../../hooks/useLoadTournament";
import { shuffle } from "es-toolkit";

const PlayersPage = () => {
  const setPlayers = useBaseStore((state) => state.setPlayers);
  const players = useBaseStore((state) => state.players);

  const { items, order, set, add, remove, reorder, orderedItems } =
    useOrderedList<string>();
  const loadTournament = useLoadTournament();
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = order.indexOf(active.id as number);
      const newIndex = order.indexOf(over.id as number);
      reorder(arrayMove(order, oldIndex, newIndex));
    }
  };

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
                        "table-cell select-none border-2 border-secondary px-2 py-1 font-bold text-secondary text-upright text-tiny uppercase empty:w-[54px] empty:border-none"
                      }
                    >
                      {column}
                    </div>
                  ))}
                </div>
              </div>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={order}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="table-row-group">
                    {orderedItems.map(({ item, order }, rank) => (
                      <PlayerListItem
                        name={item}
                        draggable={manualSeeding}
                        index={order}
                        rank={rank + 1}
                        key={order}
                        removePlayer={remove}
                      />
                    ))}
                    <PlayerAddForm addPlayer={add} draggable={manualSeeding} />
                  </div>
                </SortableContext>
              </DndContext>
            </div>

            <Hr />
            <div className="flex w-full flex-row items-center justify-between px-0.5 py-4 ">
              <ToggleButton
                disabled={disabled}
                iconSlot={<IconReorder />}
                checked={manualSeeding}
                onChange={toggleManualSeeding}
                title="Reorder list"
                shape="circle"
              />

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
        <Button iconSlot={<IconUpload />} onClick={loadTournament}>
          Load
        </Button>
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
