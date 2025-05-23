import type { Match, Player } from "turnament-scheduler";
import Hr from "../Hr";
import MatchCard from "../MatchCard";
import usePlayerNames from "../usePlayerNames";

type Props = {
	matches: Match[];
	players: Player[];
	onScoreChange: (matchToUpdate: Match) => void;
	roundNum: number;
};

const RoundCard = ({ matches, players, roundNum, onScoreChange }: Props) => {
	const names = usePlayerNames(players, matches);

	return (
		<div className="flex flex-col gap-0.5 border-2 border-secondary p-0.5">
			<Hr />
			<div className="flex justify-between">
				<h3 className="h-[54px] w-[54px] rounded-full border-1 border-secondary text-center font-bold text-4xl leading-snug">
					{roundNum}
				</h3>
				<table>
					<thead>
						<tr>
							<th
								className={
									"text-secondary text-xs py-2 px-4 font-bold uppercase border border-secondary "
								}
							>
								Players
							</th>
							<th
								className={
									" text-secondary text-xs py-2 px-4 font-bold uppercase border border-secondary "
								}
							>
								Matches
							</th>
							<th
								className={
									"text-secondary text-xs py-2 px-4 font-bold uppercase border border-secondary "
								}
							>
								BYE
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="border border-secondary text-center">0</td>
							<td className="border border-secondary text-center">0</td>
							<td className="border border-secondary text-center">0</td>
						</tr>
					</tbody>
				</table>
			</div>
			{matches.map((match, i) => (
				<MatchCard
					key={match.ID}
					match={match}
					names={names[i]}
					onScoreChange={onScoreChange}
				/>
			))}
		</div>
	);
};

export default RoundCard;
