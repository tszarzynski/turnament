import { ReadonlyRoundCard } from "turnament-components";
import { selectMatchesByRoundID, selectPreviousRoundsNum } from "./roundsSlice";

import { useShallow } from "zustand/react/shallow";
import { useBaseStore } from "../../app/store";

const PreviousRound = ({ roundID }: { roundID: number }) => {
	const previousRound = useBaseStore(
		useShallow(selectMatchesByRoundID(roundID)),
	);
	const players = useBaseStore((state) => state.players);

	return (
		<ReadonlyRoundCard
			matches={previousRound}
			players={players}
			roundNum={roundID}
		/>
	);
};

const PreviousRounds = () => {
	const previousRoundsNum = useBaseStore(useShallow(selectPreviousRoundsNum));

	return (
		<div className="py-4">
			{previousRoundsNum.map((roundID) => (
				<div key={roundID} className="mb-4">
					<PreviousRound roundID={roundID} />
				</div>
			))}
		</div>
	);
};

export default PreviousRounds;
