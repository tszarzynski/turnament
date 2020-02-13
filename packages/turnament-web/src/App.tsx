import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import "./App.css";
import PlayerListPage from "./featues/players/PlayerListPage";
import RankingListPage from "./featues/ranking/RankingListPage";
import RoundListPage from "./featues/round/RoundListPage";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",

    flexWrap: "wrap"
  }
}));

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xl" className={classes.paper}>
      <PlayerListPage />
      <RankingListPage />
      <RoundListPage />
    </Container>
  );
};

export default App;
