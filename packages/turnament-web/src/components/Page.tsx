import { lazy } from "react";
import { routes, useRoute } from "../app/router";

const PlayerListPage = lazy(() => import("../features/players/PlayersPage"));
const TypePage = lazy(() => import("../features/type/TypePage"));
const RankingPage = lazy(() => import("../features/ranking/RankingPage"));
const RoundPage = lazy(() => import("../features/round/RoundsPage"));

export function Page() {
	const route = useRoute();
	if (route.name === routes.type.name) {
		return <TypePage />;
	}

	if (route.name === routes.players.name || route.name === routes.home.name) {
		return <PlayerListPage />;
	}

	if (route.name === routes.tournamentRanking.name) {
		return <RankingPage />;
	}

	if (route.name === routes.tournamentRounds.name) {
		return <RoundPage />;
	}

	return <div>Not Found</div>;
}
