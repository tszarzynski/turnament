import { Button, IconNext, IconTabs } from "turnament-components";
import { routes } from "../../app/router";
import { useBaseStore } from "../../app/store";
import PageHeader from "../../components/PageHeader";
import PageLayout, { PageBody, PageContent } from "../../components/PageLayout";
import PageNavigation from "../../components/PageNavigation";
import CurrentRound from "./CurrentRound";
import PreviousRounds from "./PreviousRounds";
import {
	selectIsLastRound,
	selectIsRoundCompleted,
	selectIsTournamentFinished,
} from "./roundsSlice";

const RoundsPage = () => {
	const isRoundCompleted = useBaseStore(selectIsRoundCompleted);
	const isLastRound = useBaseStore(selectIsLastRound);
	const isFinished = useBaseStore(selectIsTournamentFinished);
	const nextRound = useBaseStore((state) => state.nextRound);
	const finishTournament = useBaseStore((state) => state.finishTournament);

	return (
		<PageLayout>
			<PageContent>
				<PageHeader>Rounds</PageHeader>
				<PageBody>
					<CurrentRound />
					<PreviousRounds />
				</PageBody>
			</PageContent>
			<PageNavigation>
				<div>
					{!isFinished && (
						<Button
							disabled={!isRoundCompleted}
							onClick={isLastRound ? () => finishTournament() : () => nextRound()}
							iconSlot={<IconNext />}
						>
							Next
						</Button>
					)}
				</div>
				<Button onClick={() => routes.ranking().push()} iconSlot={<IconTabs />}>
					Ranking
				</Button>
			</PageNavigation>
		</PageLayout>
	);
};

export default RoundsPage;
