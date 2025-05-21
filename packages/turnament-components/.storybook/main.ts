import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: ["../src/**/*.@(mdx|stories.@(tsx))"],

	addons: ["@storybook/addon-viewport", "@storybook/addon-essentials"],

	framework: {
		name: "@storybook/react-vite",
		options: {},
	},

	docs: {
		autodocs: true,
	},
};

export default config;
