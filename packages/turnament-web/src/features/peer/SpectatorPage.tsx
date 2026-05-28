import { useEffect, useState } from "react";
import { type ColumnDef, Header, Hr, RankingTable } from "turnament-components";
import type { PlayerWithStats, SportType } from "turnament-ranking";
import { formatScore } from "turnament-ranking";
import type { SchedulerType } from "turnament-scheduler";
import type { Route } from "type-route";
import type { routes } from "../../app/router";
import PageLayout, { PageBody, PageContent } from "../../components/PageLayout";
import { P2PSubscriber } from "./peerClient";

type SpectatorPayload = {
	ranking: PlayerWithStats[];
	sportType: SportType | null;
	scoringDivisor: number;
	schedulerType: SchedulerType | null;
};

function getColumns(
	sportType: SportType | null,
	scoringDivisor: number,
	schedulerType: SchedulerType | null,
): ColumnDef[] {
	if (schedulerType === "ELIMINATION") {
		return [
			{ label: "Wins", value: (p) => p.matchesWon },
			{ label: "Losses", value: (p) => p.matchesLost },
			{
				label: sportType === "CHESS" ? "Score" : "Pts",
				value: (p) => sportType === "CHESS" ? formatScore(p.gamesWon, scoringDivisor) : p.gamesWon,
			},
		];
	}
	if (sportType === "CHESS") {
		return [
			{ label: "Score", value: (p) => formatScore(p.gamesWon, scoringDivisor) },
			{
				label: schedulerType === "ROUND_ROBIN" ? "SB" : "BH-C1",
				value: (p) => schedulerType === "ROUND_ROBIN" ? p.sonnebornBerger : p.buchholzCut1,
			},
			{ label: "Wins", value: (p) => p.matchesWon },
		];
	}
	return [
		{ label: "Wins", value: (p) => p.matchesWon },
		{ label: "NPS", value: (p) => p.nps },
		{ label: "Pts", value: (p) => p.gamesWon },
	];
}

const SpectatorPage = ({
	route,
}: {
	route: Route<typeof routes.spectator>;
}) => {
	const [payload, setPayload] = useState<SpectatorPayload>();
	const [connected, setConnected] = useState(false);
	const [disconnected, setDisconnected] = useState(false);

	useEffect(() => {
		let cancelled = false;

		const initialisePeer = async () => {
			await P2PSubscriber.initializePeer(null);
			if (cancelled) return;

			P2PSubscriber.addDataListener((data: unknown) => {
				if (!cancelled) setPayload(data as SpectatorPayload);
			});

			P2PSubscriber.subscribe(route.params.peerID, () => {
				if (!cancelled) setDisconnected(true);
			});
			setConnected(true);
		};

		initialisePeer();

		return () => {
			cancelled = true;
			P2PSubscriber.unsubscribe();
		};
	}, [route.params.peerID]);

	const columns = getColumns(
		payload?.sportType ?? null,
		payload?.scoringDivisor ?? 1,
		payload?.schedulerType ?? null,
	);

	return (
		<PageLayout>
			<PageContent>
				<header>
					<div className="px-4 py-6">
						<Header>Ranking</Header>
					</div>
					<Hr variant="dashed" />
				</header>
				<PageBody>
					{!connected && (
						<p className="text-center text-secondary">Connecting…</p>
					)}
					{disconnected && (
						<p className="text-center text-secondary">
							Disconnected — refresh to reconnect.
						</p>
					)}
					{connected && !payload && !disconnected && (
						<p className="text-center text-secondary">Waiting for results…</p>
					)}
					{payload && (
						<RankingTable
							playersWithStats={payload.ranking}
							columns={columns}
						/>
					)}
				</PageBody>
			</PageContent>
		</PageLayout>
	);
};

export default SpectatorPage;
