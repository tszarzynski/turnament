import { useMemo } from "react";
import {
	Button,
	type ColumnDef,
	IconCast,
	IconDownload,
	IconStop,
	IconTabs,
	RankingTable,
} from "turnament-components";
import { formatScore, getRanking } from "turnament-ranking";
import { routes } from "../../app/router";
import { useBaseStore } from "../../app/store";
import PageHeader from "../../components/PageHeader";
import PageLayout, { PageBody, PageContent } from "../../components/PageLayout";
import PageNavigation from "../../components/PageNavigation";
import { useSaveTournament } from "../../hooks/useSaveTournament";

const RankingPage = () => {
	const players = useBaseStore((state) => state.players);
	const matches = useBaseStore((state) => state.matches);
	const sportType = useBaseStore((state) => state.sportType);
	const scoringDivisor = useBaseStore((state) => state.scoringDivisor);
	const schedulerType = useBaseStore((state) => state.schedulerType);
	const resetPlayers = useBaseStore((state) => state.resetPlayers);
	const resetRounds = useBaseStore((state) => state.resetRounds);
	const disablePlayer = useBaseStore((state) => state.disablePlayer);
	const saveTournament = useSaveTournament();

	const ranking = useMemo(
		() => getRanking(players, matches, sportType ?? undefined, scoringDivisor, schedulerType ?? undefined),
		[players, matches, sportType, scoringDivisor, schedulerType],
	);

	const columns = useMemo((): ColumnDef[] => {
		if (schedulerType === "ELIMINATION") {
			return [
				{ label: "Wins", value: (p) => p.matchesWon },
				{ label: "Losses", value: (p) => p.matchesLost },
				{ label: sportType === "CHESS" ? "Score" : "Pts", value: (p) => sportType === "CHESS" ? formatScore(p.gamesWon, scoringDivisor) : p.gamesWon },
			];
		}
		if (sportType === "CHESS") {
			return [
				{
					label: "Score",
					value: (p) => formatScore(p.gamesWon, scoringDivisor),
				},
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
	}, [sportType, schedulerType, scoringDivisor]);

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
					<div className="mt-4 flex justify-end gap-2">
						<Button
							onClick={() => routes.peer().push()}
							iconSlot={<IconCast />}
						>
							Share
						</Button>
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
