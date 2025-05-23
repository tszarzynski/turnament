import { routes } from "../../app/router";
import PageHeader from "../../components/PageHeader";

import { useMemo } from "react";
import { Button, IconStop, IconTabs, RankingTable } from "turnament-components";
import { getRanking } from "turnament-scheduler";
import { useBaseStore } from "../../app/store";
import PageLayout, { PageBody, PageContent } from "../../components/PageLayout";
import PageNavigation from "../../components/PageNavigation";

const RankingPage = () => {
	const players = useBaseStore((state) => state.players);
	const matches = useBaseStore((state) => state.matches);
	const ranking = useMemo(
		() => getRanking(players, matches),
		[players, matches],
	);
	const resetPlayers = useBaseStore((state) => state.resetPlayers);
	const resetRounds = useBaseStore((state) => state.resetRounds);
	const handleFinishTournament = () => {
		if (window.confirm("Are you sure?")) {
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
					<RankingTable playersWithStats={ranking} />
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
