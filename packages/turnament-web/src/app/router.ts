import { createRouter, defineRoute } from "type-route";

export const { routes, RouteProvider, useRoute } = createRouter({
	home: defineRoute("/turnament"),
	type: defineRoute("/turnament/type"),
	players: defineRoute("/turnament/players"),
	rounds: defineRoute("/turnament/rounds"),
	ranking: defineRoute("/turnament/ranking"),
});
