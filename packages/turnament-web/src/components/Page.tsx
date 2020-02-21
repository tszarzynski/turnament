import React, { lazy } from "react";
import { Route } from "type-route";
import { routes } from "../app/router";

const PlayerListPage = lazy(() => import("../featues/players/PlayerListPage"));
const SetupPage = lazy(() => import("../featues/setup/SetupPage"));
const RankingListPage = lazy(() =>
  import("../featues/ranking/RankingListPage")
);
const RoundListPage = lazy(() => import("../featues/round/RoundListPage"));

type Props = {
  route: Route<typeof routes>;
};

export function Page({ route }: Props) {
  switch (route.name) {
    case routes.setup.name:
      return <SetupPage />;

    case routes.players.name:
      return <PlayerListPage />;

    case routes.tournament.name:
      return (
        <>
          <RoundListPage />
          <RankingListPage />
        </>
      );
    default:
      return <div>Not Found</div>;
  }
}
