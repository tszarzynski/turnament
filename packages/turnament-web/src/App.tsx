import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import "./App.css";
import { getCurrentRoute, listen } from "./app/router";
import { Page } from "./components/Page";

const App: React.FC = () => {
  const [route, setRoute] = useState(getCurrentRoute());

  useEffect(() => listen(setRoute), [route]);

  return (
    <Container component="main" maxWidth="sm">
      <Page route={route} />
    </Container>
  );
};

export default App;
