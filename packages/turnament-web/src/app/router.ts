import { createRouter, defineRoute, param } from "type-route";


const isNative = import.meta.env.BASE_URL === '/';

export const { routes, RouteProvider, useRoute } = createRouter(
    { baseUrl: isNative ? "/" : "/turnament" },
    {
        home: defineRoute("/"),
        type: defineRoute("/type"),
        players: defineRoute("/players"),
        rounds: defineRoute("/rounds"),
        ranking: defineRoute("/ranking"),
        peer: defineRoute("/peer"),
        spectator: defineRoute(
            {
                peerID: param.path.string,
            },
            (p) => `/spectator/${p.peerID}`,
        ),
    }
);
