import type { Match, Player } from "turnament-scheduler";
import MatchCard from "../MatchCard";
import usePlayerNames from "../usePlayerNames";

type Props = {
	matches: Match[];
	players: Player[];
	roundNum: number;
};

const ReadonlyRoundCard = ({ matches, players }: Props) => {
	const names = usePlayerNames(players, matches);

	return (
		<div className="flex flex-col gap-0.5 border-2 border-gray-300 p-0.5">
			{matches.map((match, i) => (
				<MatchCard
					key={match.ID}
					match={match}
					names={names[i]}
					disabled={true}
				/>
			))}
		</div>
	);
};

export default ReadonlyRoundCard;
