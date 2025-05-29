import { RoundCard } from "turnament-components";
import type { Match } from "turnament-scheduler";
import { useShallow } from "zustand/react/shallow";
import { useBaseStore } from "../../app/store";
import { selectCurrentRound, selectIsRoundCompleted } from "./roundsSlice";

const CurrentRound = () => {
	const players = useBaseStore((state) => state.players);
	const round = useBaseStore(useShallow((state) => selectCurrentRound(state)));
	const roundNum = useBaseStore(useShallow((state) => state.currentRoundNum));
	const updateMatch = useBaseStore((state) => state.updateMatch);
	const minPointsToWin = useBaseStore((state) => state.minPointsToWin);
	const isRoundCompleted = useBaseStore((state) =>
		selectIsRoundCompleted(state),
	);

	const handleScoreChange = (matchToUpdate: Match) => {
		updateMatch(matchToUpdate);
	};

	return (
		<RoundCard
			roundNum={roundNum}
			matches={round}
			players={players}
			onScoreChange={handleScoreChange}
			minPointsToWin={minPointsToWin}
			completed={isRoundCompleted}
		/>
	);
};

export default CurrentRound;
