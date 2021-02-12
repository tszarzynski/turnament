import { Container } from "@material-ui/core";
import React, { Suspense } from "react";
import { Loader } from "turnament-components";
import { RouteProvider } from "./app/router";
import { Page } from "./components/Page";

const App: React.FC = () => {
  return (
    <RouteProvider>
    <Container component="main" maxWidth="sm" style={{ minHeight: "100vh" }}>
      <Suspense fallback={<Loader></Loader>}>
        <Page  />
      </Suspense>
    </Container>
    </RouteProvider>
  );
};

export default App;
