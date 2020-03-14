import { Box, Button } from "@material-ui/core";
import TitleIcon from "@material-ui/icons/AccountCircle";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../../app/router";
import PageHeader from "../../components/PageHeader";
import { nextRound } from "../round/roundsSlice";
import { DraggableList } from "./DraggableList";
import { useOrderedList } from "./hooks";
import PlayerAddForm from "./PlayerAddForm";
import PlayerListSettings from "./PlayerListSettings";
import { addPlayers, selectPlayersListAsArray } from "./playersSlice";
import { shuffleArray } from "../../utils/arrayUtils";

export default function PlayerListPage() {
  const dispatch = useDispatch();
  const players = useSelector(selectPlayersListAsArray);
  const {
    items,
    order,
    set,
    add,
    remove,
    reorder,
    orderedItems
  } = useOrderedList<string>();
  const [manualSeeding, setManualSeeding] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => set(players.map(player => player.name!)), [players, set]);

  const handleNext = () => {
    dispatch(addPlayers({ names: orderedItems }));
    dispatch(nextRound());
    routes.tournament.push();
  };

  const handleRandomize = () => {
    reorder(shuffleArray(order));
  };

  useEffect(() => {
    setDisabled(prev => items.length < 2);
  }, [items]);

  return (
    <Box
      component="main"
      width="1"
      maxHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      <PageHeader labelText="Players">
        <TitleIcon />
      </PageHeader>
      <Box my={4} overflow="scroll" flex="1">
        <DraggableList
          items={items}
          order={order}
          draggable={manualSeeding}
          reorderList={(order: number[]) => reorder(order)}
          removePlayer={(playerID: number) => {
            remove(playerID);
          }}
        />
      </Box>
      <PlayerAddForm
        addPlayer={(name: string) => {
          add(name);
        }}
      />
      <PlayerListSettings
        disabled={disabled}
        manualSeeding={manualSeeding}
        setManualSeeding={setManualSeeding}
        randomize={handleRandomize}
      ></PlayerListSettings>
      <Box my={2}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          disabled={disabled}
          onClick={handleNext}
        >
          Start Tournament
        </Button>
      </Box>
    </Box>
  );
}
