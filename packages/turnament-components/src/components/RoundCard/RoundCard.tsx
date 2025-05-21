import { useMemo } from "react";
import { BYE_ID, type Match, type Player } from "turnament-scheduler";
import MatchCard from "../MatchCard";

type Props = {
	matches: Match[];
	players: Player[];
	onScoreChange: (matchToUpdate: Match) => void;
};

const RoundCard = ({ matches, players, onScoreChange }: Props) => {
	const names = useMemo(() => {
		const getPlayer = (pr: number) => players.find((p) => p.ID === pr);

		return matches.map(({ pairing }): [string, string] => {
			const p1 = getPlayer(pairing[0]);
			const p2 = getPlayer(pairing[1]);

			return [
				pairing[0] !== BYE_ID && p1 ? p1.name : "BYE",
				pairing[1] !== BYE_ID && p2 ? p2.name : "BYE",
			];
		});
	}, [matches, players]);

	return (
		<div className="flex flex-col gap-0.5 border-secondary border-solid border-2 gap-0 p-0.5 filter-[url(#vintageGrain)]">
			<hr className="border-secondary mb-0.5" />
			<div className="flex justify-between">
				<h3 className="text-2xl text-center text-secondary border border-secondary rounded-full">
					1
				</h3>
				<table>
					<thead>
						<tr>
							<th
								className={
									"text-upright text-secondary text-xs py-2 px-4 font-bold uppercase border border-secondary [letter-spacing:-4px]"
								}
							>
								Players
							</th>
							<th
								className={
									"text-upright text-secondary text-xs py-2 px-4 font-bold uppercase border border-secondary [letter-spacing:-4px]"
								}
							>
								Matches
							</th>
							<th
								className={
									"text-upright text-secondary text-xs py-2 px-4 font-bold uppercase border border-secondary [letter-spacing:-4px]"
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
