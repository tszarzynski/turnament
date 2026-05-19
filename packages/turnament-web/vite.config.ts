import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import viteQRCode from "vite-qr";
import { defineConfig } from "vitest/config";

const isNative = process.env.BUILD_TARGET === "native";

export default defineConfig({
	base: isNative ? "/" : "/turnament",
	plugins: [
		react(),
		tailwindcss(),
		// Service workers break Capacitor's WebView — skip for native builds
		...(isNative
			? []
			: [VitePWA({ registerType: "autoUpdate", manifest: false })]),
		viteQRCode(),
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
