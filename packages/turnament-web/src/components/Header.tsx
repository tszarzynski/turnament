import { AppBar, Theme, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {},
    title: {
      flexGrow: 1
    }
  })
);

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Backgammon Tournament
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
