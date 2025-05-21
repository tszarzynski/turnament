import { ReadonlyRoundCard } from "turnament-components";
import { selectArchivedRound, selectMatchesByRoundID } from "./roundsSlice";

import { useShallow } from "zustand/react/shallow";
import { useBaseStore } from "../../app/store";

type ArchivedListContentProps = {
	roundID: number;
};
const ArchivedListContent = ({ roundID }: ArchivedListContentProps) => {
	const archivedRound = useBaseStore(
		useShallow(selectMatchesByRoundID(roundID)),
	);
	const players = useBaseStore((state) => state.players);

	return <ReadonlyRoundCard matches={archivedRound} players={players} />;
};

const ArchivedList = () => {
	const archivedRounds = useBaseStore(useShallow(selectArchivedRound));

	return (
		<div>
			{archivedRounds.map(({ roundID }) => (
				<div key={roundID}>
					Round {roundID}
					<ArchivedListContent roundID={roundID} />
				</div>
			))}
		</div>
	);
};

export default ArchivedList;
