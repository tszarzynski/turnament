import { createRouter, defineRoute, createGroup } from 'type-route';

const tournament = defineRoute('/tournament');

export const { routes, RouteProvider, useRoute } = createRouter({
  setup: defineRoute('/'),
  players: defineRoute('/players'),
  tournament,
  tournamentRounds: tournament.extend('/rounds'),
  tournamentRanking: tournament.extend('/ranking'),
});

export const tournamentGroup = createGroup([
  routes.tournament,
  routes.tournamentRounds,
  routes.tournamentRanking,
]);
