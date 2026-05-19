import { useEffect, useState } from "react";
import { RankingTable, type ColumnDef } from "turnament-components";
import type { PlayerWithStats } from "turnament-ranking";
import type { Route } from "type-route";
import type { routes } from "../../app/router";
import PageLayout, { PageBody, PageContent } from "../../components/PageLayout";
import { P2PSubscriber } from "./peerClient";

const defaultColumns: ColumnDef[] = [
	{ label: "Wins", value: (p) => p.matchesWon },
	{ label: "NPS", value: (p) => p.nps },
	{ label: "Pts", value: (p) => p.gamesWon },
];

const SpectatorPage = ({
	route,
}: { route: Route<typeof routes.spectator> }) => {
	const [ranking, setRanking] = useState<PlayerWithStats[]>();
	const [connected, setConnected] = useState(false);
	const [disconnected, setDisconnected] = useState(false);

	useEffect(() => {
		let cancelled = false;

		const initialisePeer = async () => {
			await P2PSubscriber.initializePeer(null);
			if (cancelled) return;

			P2PSubscriber.subscribe(route.params.peerID, () => {
				if (!cancelled) setDisconnected(true);
			});
			setConnected(true);

			P2PSubscriber.addDataListener((data: unknown) => {
				if (!cancelled) setRanking(data as PlayerWithStats[]);
			});
		};

		initialisePeer();

		return () => {
			cancelled = true;
			P2PSubscriber.unsubscribe();
		};
	}, [route.params.peerID]);

	return (
		<PageLayout>
			<PageContent>
				<PageBody>
					{!connected && <p className="text-center text-secondary">Connecting…</p>}
					{disconnected && (
						<p className="text-center text-secondary">
							Disconnected — refresh to reconnect.
						</p>
					)}
					{connected && !ranking && !disconnected && (
						<p className="text-center text-secondary">Waiting for results…</p>
					)}
					{ranking && <RankingTable playersWithStats={ranking} columns={defaultColumns} />}
				</PageBody>
			</PageContent>
		</PageLayout>
	);
};

export default SpectatorPage;
