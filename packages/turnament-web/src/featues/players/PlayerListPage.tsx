import { Box, Button } from "@material-ui/core";
import TitleIcon from "@material-ui/icons/AccountCircle";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../../app/router";
import PageHeader from "../../components/PageHeader";
import { nextRound } from "../round/roundsSlice";
import { useOrderedList } from "./hooks";
import PlayerList from "./PlayerList";
import PlayerListSettings from "./PlayerListSettings";
import { addPlayers, selectPlayersListAsArray } from "./playersSlice";

function shuffleArray(array: number[]) {
  const newArray = array.slice();

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

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
    <Box component="main" width="1">
      <PageHeader labelText="Players">
        <TitleIcon />
      </PageHeader>
      <Box my={4}>
        <PlayerList
          items={items}
          order={order}
          draggable={manualSeeding}
          reorderList={(order: number[]) => reorder(order)}
          removePlayer={(playerID: number) => {
            remove(playerID);
          }}
          addPlayer={(name: string) => {
            add(name);
          }}
        />
      </Box>
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
