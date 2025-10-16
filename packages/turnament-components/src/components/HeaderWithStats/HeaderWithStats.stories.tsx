import HeaderWithStats from "./HeaderWithStats";

export default {
	component: HeaderWithStats,
	title: "Header",
};

export const Default = () => {
	return (
		<HeaderWithStats
			minPtsToWin={21}
			roundsPlayed={3}
			matchesPlayed={5}
			minMatches={10}
			minGames={3}
			maxGames={5}
			gamesPlayed={2}
		>
			Title
		</HeaderWithStats>
	);
};
