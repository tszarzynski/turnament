import { createRouter, defineRoute, createGroup } from "type-route";

const tournament = defineRoute("/turnament/tournament");

export const { routes, RouteProvider, useRoute } = createRouter({
	home: defineRoute("/turnament"),
	type: defineRoute("/turnament/type"),
	players: defineRoute("/turnament/players"),
	tournament,
	tournamentRounds: tournament.extend("/rounds"),
	tournamentRanking: tournament.extend("/ranking"),
});

export const tournamentGroup = createGroup([
	routes.tournament,
	routes.tournamentRounds,
	routes.tournamentRanking,
]);
