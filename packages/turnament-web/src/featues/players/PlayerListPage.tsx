import {
  Button,
  Container,
  CssBaseline,
  Divider,
  makeStyles
} from "@material-ui/core";
import TitleIcon from "@material-ui/icons/AccountCircle";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../../app/router";
import PageHeader from "../../components/PageHeader";
import { addRound } from "../round/roundsSlice";
import PlayerList from "./PlayerList";
import {
  addPlayer,
  removePlayer,
  selectPlayersListAsArray
} from "./playersSlice";

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

export default function PlayerListPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const players = useSelector(selectPlayersListAsArray);

  const handleNext = () => {
    dispatch(addRound({ players }));

    routes.tournament.push();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <PageHeader labelText="Players">
          <TitleIcon />
        </PageHeader>
        <div className={classes.form}>
          <PlayerList
            players={players}
            removePlayer={(playerID: number) => {
              dispatch(removePlayer({ playerID }));
            }}
            addPlayer={(name: string) => {
              dispatch(addPlayer({ name }));
            }}
          />
          <Divider variant="middle" />
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            disabled={players.length < 2}
            onClick={handleNext}
          >
            Start Tournament
          </Button>
        </div>
      </div>
    </Container>
  );
}
