import {
  Button,
  Container,
  CssBaseline,
  Divider,
  makeStyles
} from "@material-ui/core";
import TitleIcon from "@material-ui/icons/AccountCircle";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../../app/router";
import PageHeader from "../../components/PageHeader";
import { nextRound } from "../round/roundsSlice";
import { useOrderedList } from "./hooks";
import PlayerList from "./PlayerList";
import { addPlayers, selectPlayersListAsArray } from "./playersSlice";

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
  const {
    items,
    order,
    set,
    add,
    remove,
    reorder,
    orderedItems
  } = useOrderedList<string>();

  useEffect(() => set(players.map(player => player.name!)), [players, set]);

  const handleNext = () => {
    dispatch(addPlayers({ names: orderedItems }));
    dispatch(nextRound());

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
            items={items}
            order={order}
            reorderList={(order: number[]) => reorder(order)}
            removePlayer={(playerID: number) => {
              remove(playerID);
            }}
            addPlayer={(name: string) => {
              add(name);
            }}
          />
          <Divider variant="middle" />
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            disabled={items.length < 2}
            onClick={handleNext}
          >
            Start Tournament
          </Button>
        </div>
      </div>
    </Container>
  );
}
