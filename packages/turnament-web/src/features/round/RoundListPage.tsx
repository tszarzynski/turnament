import { Button } from "turnament-components";
import { useBaseStore } from "../../app/store";
import PageHeader from "../../components/PageHeader";
import ArchivedList from "./ArchivedList";
import RoundList from "./RoundList";
import { selectIsRoundCompleted } from "./roundsSlice";
import { routes } from "../../app/router";

const RoundListPage = () => {
	const roundNumber = useBaseStore((state) => state.currentRoundNum);
	const isRoundCompleted = useBaseStore(selectIsRoundCompleted);
	const nextRound = useBaseStore((state) => state.nextRound);

	return (
		<div className="w-full p-1">
			<PageHeader
				buttonSlot={
					<>
						<Button disabled={!isRoundCompleted} onClick={() => nextRound()}>
							Next Round
						</Button>
						<Button onClick={() => routes.tournamentRanking().push()}>
							Ranking
						</Button>
					</>
				}
			>
				Round {roundNumber}
			</PageHeader>

			<div className="w-full p-1">
				<RoundList />
				<ArchivedList />
			</div>
		</div>
	);
};

export default RoundListPage;
