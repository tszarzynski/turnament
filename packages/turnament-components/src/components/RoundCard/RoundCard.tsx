import type { Match, Player } from "turnament-scheduler";
import Hr from "../Hr";
import MatchCard from "../MatchCard";
import usePlayerNames from "../usePlayerNames";

type Props = {
	matches: Match[];
	players: Player[];
	onScoreChange: (matchToUpdate: Match) => void;
	roundNum: number;
	minPointsToWin: number;
	completed?: boolean;
};

const RoundCard = ({
	matches,
	players,
	roundNum,
	onScoreChange,
	minPointsToWin,
	completed,
}: Props) => {
	const names = usePlayerNames(players, matches);

	const variantStyles = "border-secondary";
	const completedStyles = "border-gray-300 text-gray-300";
	const styles = completed ? completedStyles : variantStyles;

	return (
		<div className={`flex flex-col gap-0.5 border-2 p-0.5 ${styles}`}>
			<Hr />
			<div className="flex justify-between">
				<h3
					className={`aspect-square h-[54px] rounded-full border-2 text-center font-bold text-4xl text-handwritten leading-relaxed ${styles}`}
				>
					{roundNum}
				</h3>
			</div>
			{matches.map((match, i) => (
				<MatchCard
					key={match.ID}
					match={match}
					names={names[i]}
					onScoreChange={onScoreChange}
					minPointsToWin={minPointsToWin}
				/>
			))}
		</div>
	);
};

export default RoundCard;
