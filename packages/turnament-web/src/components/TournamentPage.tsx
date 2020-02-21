import React from "react";
import { Route } from "type-route";
import { routes, tournamentGroup } from "../app/router";
import RankingListPage from "../featues/ranking/RankingListPage";
import RoundListPage from "../featues/round/RoundListPage";
import TournamentNavigation from "./TournamentNavigation";

type Props = {
  route: Route<typeof tournamentGroup>;
};

export default function TournamentPage({ route }: Props) {
  let pageContents = <RoundListPage />;

  if (route.name === routes.tournamentRanking.name) {
    pageContents = <RankingListPage />;
  }

  if (route.name === routes.tournamentRounds.name) {
    pageContents = <RoundListPage />;
  }

  return (
    <>
      {pageContents}
      <TournamentNavigation route={route} />
    </>
  );
}
