import { useState } from "react";
import { useEffectOnce } from "react-use";
import { RankingTable } from "turnament-components";
import type { PlayerWithStats } from "turnament-scheduler";
import type { Route } from "type-route";
import type { routes } from "../../app/router";
import PageLayout, { PageBody, PageContent } from "../../components/PageLayout";
import { P2PSubscriber } from "./peerClient";

const SpectatorPage = ({
	route,
}: { route: Route<typeof routes.spectator> }) => {
	const [ranking, setRanking] = useState<PlayerWithStats[]>();

	useEffectOnce(() => {
		const initialisePeer = async () => {
			await P2PSubscriber.initializePeer(null);
			P2PSubscriber.subscribe(route.params.peerID);
			P2PSubscriber.addDataListener((data: unknown) => {
				console.log(data);
				setRanking(data as PlayerWithStats[]);
			});
		};

		initialisePeer();
	});

	return (
		<PageLayout>
			<PageContent>
				<PageBody>
					{ranking && <RankingTable playersWithStats={ranking} />}
				</PageBody>
			</PageContent>
		</PageLayout>
	);
};

export default SpectatorPage;
