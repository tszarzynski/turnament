import type { Match, Player } from "turnament-scheduler";
import MatchCard from "../MatchCard";
import usePlayerNames from "../usePlayerNames";
import Hr from "../Hr";

type Props = {
	matches: Match[];
	players: Player[];
	roundNum: number;
};

const ReadonlyRoundCard = ({ matches, players, roundNum }: Props) => {
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
					/>
				))}
			</div>
		</details>
	);
};

export default ReadonlyRoundCard;
