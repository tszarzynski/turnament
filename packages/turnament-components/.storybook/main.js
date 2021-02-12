const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-actions',

    '@storybook/preset-create-react-app',
    '@storybook/addon-viewport/register',
    '@storybook/addon-backgrounds',
    'storybook-addon-material-ui/register',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
    '@storybook/addon-essentials',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.css$/i,
      include: path.join(__dirname, 'src/components'),
      use: [
        'style-loader',
        '@teamsupercell/typings-for-css-modules-loader',
        {
          loader: 'css-loader',
          options: { modules: true, namedExport: true, camelCase: true },
        },
      ],
    });
    return config;
  },
};
