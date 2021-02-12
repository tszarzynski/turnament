import { Box } from "@material-ui/core";
import React from "react";
import { routes, useRoute } from "../app/router";
import RankingListPage from "../featues/ranking/RankingListPage";
import RoundListPage from "../featues/round/RoundListPage";
import TournamentNavigation from "./TournamentNavigation";



export default function TournamentPage() {
  let pageContents = <RoundListPage />;
  const route = useRoute();

  if (route.name === routes.tournamentRanking.name) {
    pageContents = <RankingListPage />;
  }

  if (route.name === routes.tournamentRounds.name) {
    pageContents = <RoundListPage />;
  }

  return (
    <Box pb={8}>
      {pageContents}
      <TournamentNavigation />
    </Box>
  );
}
