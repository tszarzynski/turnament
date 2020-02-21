import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import "./App.css";
import { getCurrentRoute, listen } from "./app/router";
import { Page } from "./components/Page";

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
  const [route, setRoute] = useState(getCurrentRoute());

  useEffect(() => listen(setRoute), [route]);

  return (
    <Container component="main" maxWidth="sm" className={classes.paper}>
      <Page route={route} />
    </Container>
  );
};

export default App;
