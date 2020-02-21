import React, { lazy } from "react";
import { Route } from "type-route";
import { routes, tournamentGroup } from "../app/router";

const PlayerListPage = lazy(() => import("../featues/players/PlayerListPage"));
const SetupPage = lazy(() => import("../featues/setup/SetupPage"));
const TournamentPage = lazy(() => import("./TournamentPage"));

type Props = {
  route: Route<typeof routes>;
};

export function Page({ route }: Props) {
  if (route.name === routes.setup.name) {
    return <SetupPage />;
  }

  if (route.name === routes.players.name) {
    return <PlayerListPage />;
  }

  if (tournamentGroup.has(route)) {
    return <TournamentPage route={route} />;
  }

  return <div>Not Found</div>;
}
