import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "com.tszarzynski.turnament",
	appName: "Turnament",
	webDir: "../turnament-web/dist",
	server: {
		androidScheme: "https",
	},
};

export default config;
