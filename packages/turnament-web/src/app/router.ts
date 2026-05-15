import { createRouter, defineRoute } from "type-route";

const isNative = import.meta.env.BASE_URL === '/';

export const { routes, RouteProvider, useRoute } = createRouter(
    { baseUrl: isNative ? "/" : "/turnament" },
    {
        home: defineRoute("/"),
        type: defineRoute("/type"),
        players: defineRoute("/players"),
        rounds: defineRoute("/rounds"),
        ranking: defineRoute("/ranking"),
    }
);
