import type { Match, Player } from "turnament-scheduler";
import Hr from "../Hr";
import MatchCard from "../MatchCard";
import usePlayerNames from "../usePlayerNames";

type SportType = "BACKGAMMON" | "CHESS";

type Props = {
	matches: Match[];
	players: Player[];
	roundNum: number;
	sportType?: SportType;
	scoringDivisor?: number;
	minPointsToWin?: number;
};

const ReadonlyRoundCard = ({
	matches,
	players,
	roundNum,
	sportType,
	scoringDivisor = 1,
	minPointsToWin,
}: Props) => {
	const names = usePlayerNames(players, matches);

	return (
		<details className="flex flex-col gap-0.5 border-2 p-0.5">
			<summary>
				<Hr />
				<div className="flex justify-between">
					<h3 className="h-[54px] w-[54px] rounded-full border-1 border-gray-300 text-center font-bold text-4xl text-gray-300 leading-snug">
						{roundNum}
					</h3>
				</div>
			</summary>
			<div>
				{matches.map((match, i) => (
					<MatchCard
						key={match.ID}
						match={match}
						names={names[i]}
						disabled={true}
						sportType={sportType}
						scoringDivisor={scoringDivisor}
						minPointsToWin={minPointsToWin}
					/>
				))}
			</div>
		</details>
	);
};

export default ReadonlyRoundCard;
