import type { ReactNode } from "react";
import { useBaseStore } from "../app/store";
import {
	selectGamesPlayed,
	selectMatchesPlayedNum,
	selectMaxGamesNeeded,
	selectMinGamesNeeded,
	selectMinMatchesNeeded,
	selectMinRoundNeeded,
	selectRoundsPlayedNum,
} from "../features/round/roundsSlice";
import { Header, Hr } from "turnament-components";
import { getSchedulerByType } from "../utils/schedulerUtils";

interface Props {
	children: ReactNode;
}

export default function PageHeader({ children }: Props) {
	const playersNum = useBaseStore((state) => state.players.length);
	const minPtsToWin = useBaseStore((state) => state.minPointsToWin);
	const schedulerType = useBaseStore((state) => state.schedulerType);
	const minRounds = useBaseStore((state) => selectMinRoundNeeded(state));
	const minMatches = useBaseStore((state) => selectMinMatchesNeeded(state));
	const roundsPlayedNum = useBaseStore((state) => selectRoundsPlayedNum(state));
	const matchesPlayedNum = useBaseStore((state) =>
		selectMatchesPlayedNum(state),
	);
	const minGames = useBaseStore((state) => selectMinGamesNeeded(state));
	const maxGames = useBaseStore((state) => selectMaxGamesNeeded(state));
	const gamesPlayed = useBaseStore((state) => selectGamesPlayed(state));
	console.log(minPtsToWin);
	return (
		<header>
			<div className="px-4 py-6">
				<Header
					minRounds={minRounds}
					roundsPlayed={roundsPlayedNum}
					minMatches={minMatches}
					matchesPlayed={matchesPlayedNum}
					minGames={minGames}
					maxGames={maxGames}
					gamesPlayed={gamesPlayed}
					playersNum={playersNum}
					minPtsToWin={minPtsToWin}
					turnamentType={
						schedulerType ? getSchedulerByType(schedulerType).shortName : ""
					}
				>
					{children}
				</Header>
			</div>
			<Hr variant="dashed" />
		</header>
	);
}
