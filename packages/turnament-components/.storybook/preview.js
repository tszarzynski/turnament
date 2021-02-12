import { addDecorator, addParameters } from "@storybook/react"; // <- or your storybook framework
import { muiTheme } from "storybook-addon-material-ui";

addParameters({
  backgrounds: [
    { name: "light", value: "#f5f5f6", default: true },
    { name: "dark", value: "#5A5A5A" },
  ],
});

const newTheme = {
  themeName: "Default",
  palette: {
    primary: {
      light: "#9bffb2",
      main: "#66e082",
      dark: "#2aad54",
    },
    secondary: {
      light: "#5b94a3",
      main: "#2a6674",
      dark: "#003b48",
    },
  },
};

addDecorator(muiTheme([newTheme]));
