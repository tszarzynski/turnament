import { Container } from "@material-ui/core";
import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import { getCurrentRoute, listen } from "./app/router";
import { Page } from "./components/Page";
import { Loader } from "turnament-components";

const App: React.FC = () => {
  const [route, setRoute] = useState(getCurrentRoute());

  useEffect(() => listen(setRoute), [route]);

  return (
    <Container component="main" maxWidth="sm" style={{ minHeight: "100vh" }}>
      <Suspense fallback={<Loader></Loader>}>
        <Page route={route} />
      </Suspense>
    </Container>
  );
};

export default App;
