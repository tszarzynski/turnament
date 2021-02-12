import React, { lazy } from "react";
import { routes, tournamentGroup, useRoute } from "../app/router";

const PlayerListPage = lazy(() => import("../featues/players/PlayerListPage"));
const SetupPage = lazy(() => import("../featues/setup/SetupPage"));
const TournamentPage = lazy(() => import("./TournamentPage"));



export function Page() {
  const route = useRoute();
  if (route.name === routes.setup.name) {
    return <SetupPage />;
  }

  if (route.name === routes.players.name) {
    return <PlayerListPage />;
  }

  if (tournamentGroup.has(route)) {
    return <TournamentPage />;
  }

  return <div>Not Found</div>;
}
