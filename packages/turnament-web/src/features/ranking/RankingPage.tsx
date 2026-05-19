import { routes } from "../../app/router";
import PageHeader from "../../components/PageHeader";

import { useMemo } from "react";
import { Button, IconDownload, IconStop, IconTabs, RankingTable, type ColumnDef } from "turnament-components";
import { formatScore, getRanking } from "turnament-ranking";
import { useBaseStore } from "../../app/store";
import { useSaveTournament } from "../../hooks/useSaveTournament";
import PageLayout, { PageBody, PageContent } from "../../components/PageLayout";
import PageNavigation from "../../components/PageNavigation";

const RankingPage = () => {
	const players = useBaseStore((state) => state.players);
	const matches = useBaseStore((state) => state.matches);
	const sportType = useBaseStore((state) => state.sportType);
	const scoringDivisor = useBaseStore((state) => state.scoringDivisor);
	const resetPlayers = useBaseStore((state) => state.resetPlayers);
	const resetRounds = useBaseStore((state) => state.resetRounds);
	const disablePlayer = useBaseStore((state) => state.disablePlayer);
	const saveTournament = useSaveTournament();

	const ranking = useMemo(
		() => getRanking(players, matches, sportType ?? undefined, scoringDivisor),
		[players, matches, sportType, scoringDivisor],
	);

	const columns = useMemo((): ColumnDef[] => {
		if (sportType === "CHESS") {
			return [
				{ label: "Score", value: (p) => formatScore(p.gamesWon, scoringDivisor) },
				{ label: "BH-C1", value: (p) => p.buchholzCut1 },
				{ label: "Wins", value: (p) => p.matchesWon },
			];
		}
		return [
			{ label: "Wins", value: (p) => p.matchesWon },
			{ label: "NPS", value: (p) => p.nps },
			{ label: "Pts", value: (p) => p.gamesWon },
		];
	}, [sportType, scoringDivisor]);

	const handleFinishTournament = () => {
		if (confirm("Are you sure?")) {
			resetPlayers();
			resetRounds();
			routes.players().push();
		}
	};

	return (
		<PageLayout>
			<PageContent>
				<PageHeader>Ranking</PageHeader>
				<PageBody>
					<RankingTable
						playersWithStats={ranking}
						columns={columns}
						onDisablePlayerClick={(player) => {
							if (confirm("Are you sure?")) {
								disablePlayer(player);
							}
						}}
					/>
					<div className="mt-4 flex justify-end">
						<Button onClick={saveTournament} iconSlot={<IconDownload />}>
							Save
						</Button>
					</div>
				</PageBody>
			</PageContent>
			<PageNavigation>
				<Button onClick={handleFinishTournament} iconSlot={<IconStop />}>
					Finish
				</Button>
				<Button onClick={() => routes.rounds().push()} iconSlot={<IconTabs />}>
					Rounds
				</Button>
			</PageNavigation>
		</PageLayout>
	);
};

export default RankingPage;
