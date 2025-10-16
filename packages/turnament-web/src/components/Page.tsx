import { lazy } from "react";
import { routes, useRoute } from "../app/router";

const PlayerListPage = lazy(() => import("../features/players/PlayersPage"));
const TypePage = lazy(() => import("../features/type/TypePage"));
const RankingPage = lazy(() => import("../features/ranking/RankingPage"));
const RoundPage = lazy(() => import("../features/round/RoundsPage"));
const PeerPage = lazy(() => import("../features/peer/PeerPage"));
const SpectatorPage = lazy(() => import("../features/peer/SpectatorPage"));

export function Page() {
	const route = useRoute();
	if (route.name === routes.type.name) {
		return <TypePage />;
	}

	if (route.name === routes.players.name || route.name === routes.home.name) {
		return <PlayerListPage />;
	}

	if (route.name === routes.ranking.name) {
		return <RankingPage />;
	}

	if (route.name === routes.rounds.name) {
		return <RoundPage />;
	}

	if (route.name === routes.peer.name) {
		return <PeerPage />;
	}

	if (route.name === routes.spectator.name) {
		return <SpectatorPage route={route} />;
	}

	return <div>Not Found</div>;
}
