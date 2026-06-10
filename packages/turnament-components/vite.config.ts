import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tailwindcss()],
	test: {
		browser: {
			enabled: true,
			headless: true,
			provider: "playwright",
			instances: [{ browser: "chromium" }],
		},
	},
});
