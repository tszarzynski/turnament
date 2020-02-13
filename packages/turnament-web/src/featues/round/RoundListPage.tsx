import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  makeStyles,
  Typography
} from "@material-ui/core";
import TitleIcon from "@material-ui/icons/List";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/reducers";
import RoundList from "./RoundList";
import {
  addRound,
  selectCurrentRound,
  selectCurrentRoundNumber
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
  const { players } = useSelector((state: RootState) => state);
  const rounds = useSelector(selectCurrentRound);
  const roundNumber = useSelector(selectCurrentRoundNumber);
  const dispatch = useDispatch();

  if (!rounds.length) return null;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <TitleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {"Round " + roundNumber}
        </Typography>
        <div className={classes.form}>
          <RoundList players={players} round={rounds} />
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            disabled={players.length < 2}
            onClick={() => dispatch(addRound({ players }))}
          >
            Next Round
          </Button>
        </div>
      </div>
    </Container>
  );
}
