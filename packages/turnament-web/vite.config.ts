import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	base: "/turnament",
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: false,
		}),
	],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/setupTests.ts",
		css: true,
		reporters: ["verbose"],
		coverage: {
			reporter: ["text", "json", "html"],
			include: ["src/**/*"],
			exclude: [],
		},
	},
	server: {
		open: true,
		port: 3000,
		strictPort: true,
		hmr: {
			overlay: false,
		},
	},
	preview: {
		port: 3000,
		strictPort: true,
	},
});
