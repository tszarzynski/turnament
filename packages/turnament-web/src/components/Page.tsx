import { lazy } from "react";
import { routes, useRoute } from "../app/router";

const PlayerListPage = lazy(() => import("../features/players/PlayerListPage"));
const TypePage = lazy(() => import("../features/type/TypePage"));
const RankingListPage = lazy(
	() => import("../features/ranking/RankingListPage"),
);
const RoundListPage = lazy(() => import("../features/round/RoundListPage"));

export function Page() {
	const route = useRoute();
	if (route.name === routes.type.name) {
		return <TypePage />;
	}

	if (route.name === routes.players.name || route.name === routes.home.name) {
		return <PlayerListPage />;
	}

	if (route.name === routes.tournamentRanking.name) {
		return <RankingListPage />;
	}

	if (route.name === routes.tournamentRounds.name) {
		return <RoundListPage />;
	}

	return <div>Not Found</div>;
}
