import {
  Avatar,
  Container,
  CssBaseline,
  makeStyles,
  Typography,
  Button,
  Divider
} from "@material-ui/core";
import TitleIcon from "@material-ui/icons/AccountCircle";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/reducers";
import PlayerList from "./PlayerList";
import { addPlayer, removePlayer } from "./playersSlice";
import { addRound, selectCurrentRoundNumber } from "../round/roundsSlice";

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
  const { players } = useSelector((state: RootState) => state);
  const roundNumber = useSelector(selectCurrentRoundNumber);

  if (roundNumber > 0) return null;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <TitleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Players
        </Typography>
        <div className={classes.form}>
          <PlayerList
            players={players}
            removePlayer={(playerID: number) => {
              dispatch(removePlayer({ playerID }));
            }}
            addPlayer={(name: string) => {
              dispatch(addPlayer(name));
            }}
          />
          <Divider variant="middle" />
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            disabled={players.length < 2}
            onClick={() => dispatch(addRound({ players }))}
          >
            Start Tournament
          </Button>
        </div>
      </div>
    </Container>
  );
}
