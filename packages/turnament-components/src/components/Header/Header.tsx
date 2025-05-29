import Hr from "../Hr";

type Props = {
	children: React.ReactNode;
	turnamentType?: string;
	playersNum?: number;
	minPtsToWin: number;
	roundsPlayed: number;
	minRounds?: number;
	matchesPlayed: number;
	minMatches: number;
	minGames: number;
	maxGames: number;
	gamesPlayed: number;
};

function valueOrPlaceholder(value?: string | number) {
	return value || "";
}

const Header = ({
	children,
	turnamentType,
	playersNum,
	minPtsToWin,
	minRounds,
	minMatches,
	roundsPlayed,
	matchesPlayed,
	minGames,
	maxGames,
	gamesPlayed,
}: Props) => {
	const headings = [
		"Type",
		"Players",
		"Pts To Win",
		"Rounds",
		"Matches",
		"Games",
	];

	const columns = [
		valueOrPlaceholder(turnamentType),
		valueOrPlaceholder(playersNum),
		valueOrPlaceholder(minPtsToWin),
		minRounds ? `${roundsPlayed} / ${minRounds}` : "",
		minMatches ? `${matchesPlayed} / ${minMatches}` : "",
		minGames ? `${gamesPlayed} / ${minGames}-${maxGames}` : "",
	];

	return (
		<div className="static border-secondary border-t-2 p-0.5 ">
			<div className="py-6 text-center font-bold text-4xl text-secondary uppercase leading-none">
				{children}
			</div>

			<Hr />
			<table className="w-full table-fixed border-separate border-spacing-0.5">
				<thead>
					<tr>
						{headings.slice(0, 3).map((column) => (
							<th
								key={column}
								className={
									"border-2 border-secondary px-2 py-1 font-bold text-secondary text-xs uppercase"
								}
							>
								{column}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						{columns.slice(0, 3).map((column, index) => (
							<td
								key={`${index}${column}`}
								className="h-[27px] border border-secondary px-2  text-center font-bold text-2xl text-handwritten leading-none"
							>
								{column}
							</td>
						))}
					</tr>
				</tbody>
			</table>
			<table className="-mt-[1px] w-full table-fixed border-separate border-spacing-0.5">
				<thead>
					<tr>
						{headings.slice(3).map((column) => (
							<th
								key={column}
								className={
									"border-2 border-secondary px-2 py-1 font-bold text-secondary text-xs uppercase"
								}
							>
								{column}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						{columns.slice(3).map((column, index) => (
							<td
								key={`${index}${column}`}
								className="h-[27px] border border-secondary px-2  text-center font-bold text-2xl text-handwritten leading-none"
							>
								{column}
							</td>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Header;
