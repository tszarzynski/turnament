import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles
} from "@material-ui/core";
import RankingIcon from "@material-ui/icons/EmojiEvents";
import RoundsIcon from "@material-ui/icons/List";
import React, { useEffect } from "react";
import { routes, useRoute } from "../app/router";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backfaceVisibility: "hidden"
  }
});



export default function TournamentNavigation() {
  const classes = useStyles();
  const route = useRoute();

  const [value, setValue] = React.useState(0);

  const handleChange = (
    e: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    setValue(newValue);

    if (newValue === 0) routes.tournamentRounds().push();
    if (newValue === 1) routes.tournamentRanking().push();
  };

  useEffect(() => {
    if (route.name === routes.tournamentRounds.name) {
      setValue(0);
    }

    if (route.name === routes.tournamentRanking.name) {
      setValue(1);
    }
  }, [route]);

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Rounds" icon={<RoundsIcon />} />
      <BottomNavigationAction label="Ranking" icon={<RankingIcon />} />
    </BottomNavigation>
  );
}
