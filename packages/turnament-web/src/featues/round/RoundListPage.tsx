import { Box, Button } from "@material-ui/core";
import TitleIcon from "@material-ui/icons/List";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader";
import { selectPlayersListAsArray } from "../players/playersSlice";
import RoundList from "./RoundList";
import {
  nextRound,
  selectCurrentRoundNumber,
  selectIsRoundCompleted,
  selectMatchesAsArray,
} from "./roundsSlice";

export default function RoundListPage() {
  const players = useSelector(selectPlayersListAsArray);
  const rounds = useSelector(selectMatchesAsArray);
  // const allRoundsNums = useSelector(selectAllRoundIDs);
  const roundNumber = useSelector(selectCurrentRoundNumber);
  const isRoundCompleted = useSelector(selectIsRoundCompleted);
  const dispatch = useDispatch();

  return (
    <Box component="main" width={1}>
      <PageHeader labelText={"Round " + roundNumber}>
        <TitleIcon />
      </PageHeader>

      <RoundList players={players} round={rounds} />
      <Box my={2}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          disabled={!isRoundCompleted}
          onClick={() => dispatch(nextRound())}
        >
          Next Round
        </Button>
      </Box>
    </Box>
  );
}
