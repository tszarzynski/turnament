import { useMemo } from "react";
import { BYE_ID, type Match, type Player } from "turnament-scheduler";
import MatchCard from "../MatchCard";

type Props = {
	matches: Match[];
	players: Player[];
};

const ReadonlyRoundCard = ({ matches, players }: Props) => {
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
