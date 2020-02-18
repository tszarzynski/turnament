import { Button, Container, CssBaseline, makeStyles } from "@material-ui/core";
import TitleIcon from "@material-ui/icons/List";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader";
import { selectPlayersListAsArray } from "../players/playersSlice";
import RoundList from "./RoundList";
import {
  addRound,
  selectCurrentRound,
  selectCurrentRoundNumber,
  selectIsRoundCompleted
} from "./roundsSlice";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  }
}));

export default function RoundListPage() {
  const classes = useStyles();
  const players = useSelector(selectPlayersListAsArray);
  const rounds = useSelector(selectCurrentRound);
  const roundNumber = useSelector(selectCurrentRoundNumber);
  const isRoundCompleted = useSelector(selectIsRoundCompleted);
  const dispatch = useDispatch();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <PageHeader labelText={"Round " + roundNumber}>
          <TitleIcon />
        </PageHeader>

        <div className={classes.form}>
          <RoundList players={players} round={rounds} />
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            disabled={!isRoundCompleted || players.length < 2}
            onClick={() => dispatch(addRound({ players }))}
          >
            Next Round
          </Button>
        </div>
      </div>
    </Container>
  );
}
