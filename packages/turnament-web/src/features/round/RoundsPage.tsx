import { Button, IconNext, IconTabs } from "turnament-components";
import { routes } from "../../app/router";
import { useBaseStore } from "../../app/store";
import PageHeader from "../../components/PageHeader";
import PageLayout, { PageBody, PageContent } from "../../components/PageLayout";
import PageNavigation from "../../components/PageNavigation";
import CurrentRound from "./CurrentRound";
import PreviousRounds from "./PreviousRounds";
import { selectIsRoundCompleted } from "./roundsSlice";

const RoundsPage = () => {
	const isRoundCompleted = useBaseStore(selectIsRoundCompleted);
	const nextRound = useBaseStore((state) => state.nextRound);

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
				<Button
					disabled={!isRoundCompleted}
					onClick={() => nextRound()}
					iconSlot={<IconNext />}
				>
					Next
				</Button>
				<Button onClick={() => routes.ranking().push()} iconSlot={<IconTabs />}>
					Ranking
				</Button>
			</PageNavigation>
		</PageLayout>
	);
};

export default RoundsPage;
