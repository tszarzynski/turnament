import { Button, Container, CssBaseline, makeStyles } from "@material-ui/core";
import TitleIcon from "@material-ui/icons/EmojiEvents";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../../app/router";
import PageHeader from "../../components/PageHeader";
import { disablePlayer, resetPlayers } from "../players/playersSlice";
import { resetRounds, selectRankedPlayers } from "../round/roundsSlice";
import RankingList from "./RankingList";

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

export default function RankingListPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const players = useSelector(selectRankedPlayers);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <PageHeader labelText="Ranking">
          <TitleIcon />
        </PageHeader>

        <div className={classes.form}>
          <RankingList
            players={players}
            deactivatePlayer={(playerID: number) => {
              dispatch(disablePlayer({ playerID }));
            }}
          />

          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={() => {
              dispatch(resetPlayers());
              dispatch(resetRounds());
              routes.setup.push();
            }}
          >
            Finish Tournament
          </Button>
        </div>
      </div>
    </Container>
  );
}
