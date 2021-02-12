import { Box, Button } from "@material-ui/core";
import TitleIcon from "@material-ui/icons/EmojiEvents";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../../app/router";
import PageHeader from "../../components/PageHeader";
import { disablePlayer, resetPlayers } from "../players/playersSlice";
import { resetRounds, selectRankedPlayers } from "../round/roundsSlice";
import RankingList from "./RankingList";

export default function RankingListPage() {
  const dispatch = useDispatch();
  const players = useSelector(selectRankedPlayers);

  return (
    <Box component="main" width={1}>
      <PageHeader labelText="Ranking">
        <TitleIcon />
      </PageHeader>

      <RankingList
        players={players}
        deactivatePlayer={(playerID: number) => {
          dispatch(disablePlayer({ playerID }));
        }}
      />

      <Box my={2}>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={() => {
            dispatch(resetPlayers());
            dispatch(resetRounds());
            routes.setup().push();
          }}
        >
          Finish Tournament
        </Button>
      </Box>
    </Box>
  );
}
