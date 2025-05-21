import { RoundCard } from "turnament-components";
import type { Match } from "turnament-scheduler";
import { useShallow } from "zustand/react/shallow";
import { useBaseStore } from "../../app/store";
import { selectCurrentRound } from "./roundsSlice";

const RoundList = () => {
	const players = useBaseStore((state) => state.players);
	const round = useBaseStore(useShallow((state) => selectCurrentRound(state)));
	const updateMatch = useBaseStore((state) => state.updateMatch);

	const handleScoreChange = (matchToUpdate: Match) => {
		updateMatch(matchToUpdate);
	};

	return (
		<RoundCard
			matches={round}
			players={players}
			onScoreChange={handleScoreChange}
		/>
	);
};

export default RoundList;
