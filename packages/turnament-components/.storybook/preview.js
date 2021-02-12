import { muiTheme } from 'storybook-addon-material-ui';

export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#f5f5f6' },
      { name: 'dark', value: '#5A5A5A' },
    ],
  },
};

const newTheme = {
  themeName: 'Default',
  palette: {
    primary: {
      light: '#9bffb2',
      main: '#66e082',
      dark: '#2aad54',
    },
    secondary: {
      light: '#5b94a3',
      main: '#2a6674',
      dark: '#003b48',
    },
  },
};

export const decorators = [muiTheme([newTheme])];
