import { RoundCard } from "turnament-components";
import type { Match } from "turnament-scheduler";
import { useShallow } from "zustand/react/shallow";
import { useBaseStore } from "../../app/store";
import { selectCurrentRound } from "./roundsSlice";

const CurrentRound = () => {
	const players = useBaseStore((state) => state.players);
	const round = useBaseStore(useShallow((state) => selectCurrentRound(state)));
	const roundNum = useBaseStore(useShallow((state) => state.currentRoundNum));
	const updateMatch = useBaseStore((state) => state.updateMatch);

	const handleScoreChange = (matchToUpdate: Match) => {
		updateMatch(matchToUpdate);
	};

	return (
		<RoundCard
			roundNum={roundNum}
			matches={round}
			players={players}
			onScoreChange={handleScoreChange}
		/>
	);
};

export default CurrentRound;
