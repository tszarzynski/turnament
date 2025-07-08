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
	const completedStyles = "border-black text-gray-500";
	const styles = completed ? completedStyles : variantStyles;

	return (
		<div className={`flex flex-col gap-0.5 border-2 p-0.5 ${styles}`}>
			<Hr />
			<div className="flex justify-between">
				<RoundNum roundNum={roundNum} completed={completed} />
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

const RoundNum = ({
	roundNum,
	completed,
}: { roundNum: number; completed?: boolean }) => {
	return (
		<h3
			className={`aspect-square h-[54px] select-none rounded-full border-2 text-center font-bold text-4xl text-handwritten leading-relaxed ${completed ? "border-black text-black" : "border-secondary"}`}
		>
			{roundNum}
		</h3>
	);
};
