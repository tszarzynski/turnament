import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./app/store";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { CssBaseline } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#f5f5f6"
    },
    primary: {
      light: "#9bffb2",
      main: "#66e082",
      dark: "#2aad54"
    },
    secondary: {
      light: "#5b94a3",
      main: "#2a6674",
      dark: "#003b48"
    }
  }
});
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
