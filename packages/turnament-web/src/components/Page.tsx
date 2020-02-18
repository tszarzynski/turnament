import React from "react";
import { Route } from "type-route";
import { routes } from "../app/router";
import PlayerListPage from "../featues/players/PlayerListPage";
import SetupPage from "../featues/setup/SetupPage";
import RankingListPage from "../featues/ranking/RankingListPage";
import RoundListPage from "../featues/round/RoundListPage";

type Props = {
  route: Route<typeof routes>;
};

export function Page({route}: Props) {
  switch (route.name) {
    case routes.setup.name:
      return <SetupPage />;

    case routes.players.name:
      return <PlayerListPage />;

    case routes.tournament.name:
      return (
        <>
          <RankingListPage />
          <RoundListPage />
        </>
      );
    default:
      return <div>Not Found</div>;
  }
}
