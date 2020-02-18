import { createRouter, defineRoute } from "type-route";

export const { routes, listen, getCurrentRoute } = createRouter({
  setup: defineRoute("/"),
  players: defineRoute("/players"),
  tournament: defineRoute("/tournament")
});
