import { routes } from "../../app/router";
import PageHeader from "../../components/PageHeader";

import { useMemo } from "react";
import { Button, IconStop, RankingTable } from "turnament-components";
import { getRanking } from "turnament-scheduler";
import { useBaseStore } from "../../app/store";

const RankingListPage = () => {
	const players = useBaseStore((state) => state.players);
	const matches = useBaseStore((state) => state.matches);
	const ranking = useMemo(
		() => getRanking(players, matches),
		[players, matches],
	);
	const resetPlayers = useBaseStore((state) => state.resetPlayers);
	const resetRounds = useBaseStore((state) => state.resetRounds);
	const handleFinishTournament = () => {
		resetPlayers();
		resetRounds();
		routes.players().push();
	};

	return (
		<div className="w-full p-1">
			<PageHeader
				buttonSlot={
					<Button onClick={() => routes.tournamentRounds().push()}>
						Rounds
					</Button>
				}
			>
				Ranking
			</PageHeader>
			<div className="my-4">
				<RankingTable playersWithStats={ranking} />
			</div>
			<div className="my-4">
				<Button
					iconSlot={<IconStop />}
					fullWidth={true}
					onClick={handleFinishTournament}
				>
					Finish Tournament
				</Button>
			</div>
		</div>
	);
};

export default RankingListPage;
