import { Box, Button } from "@material-ui/core";
import TitleIcon from "@material-ui/icons/List";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader";
import { selectPlayersListAsArray } from "../players/playersSlice";
import RoundList from "./RoundList";
import {
  nextRound,
  selectCurrentRound,
  selectCurrentRoundNumber,
  selectIsRoundCompleted,
  selectAllRoundsNumbers
} from "./roundsSlice";
import { GenericList } from "../../components/GenericList";
import Round from "./Round";

export class RoundsList extends GenericList<number> {}

export default function RoundListPage() {
  const players = useSelector(selectPlayersListAsArray);
  const rounds = useSelector(selectCurrentRound);
  const roundNumber = useSelector(selectCurrentRoundNumber);
  const isRoundCompleted = useSelector(selectIsRoundCompleted);
  const allRoundsNumbers = useSelector(selectAllRoundsNumbers);

  const dispatch = useDispatch();

  return (
    <Box component="main" width={1}>
      <PageHeader labelText={"Round " + roundNumber}>
        <TitleIcon />
      </PageHeader>
      <RoundsList
        items={allRoundsNumbers}
        itemRenderer={item => <Round key={item} roundID={item} />}
      />

      {/* <RoundList players={players} round={rounds} /> */}
      <Box my={2}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          disabled={!isRoundCompleted || players.length < 2}
          onClick={() => dispatch(nextRound())}
        >
          Next Round
        </Button>
      </Box>
    </Box>
  );
}
