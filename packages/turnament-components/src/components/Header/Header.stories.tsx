import Header from "./Header";

export default {
	component: Header,
	title: "Header",
};

export const TitleOnly = () => <Header>Title</Header>;

export const WithStats = () => (
	<Header
		turnamentType="Swiss"
		playersNum={8}
		minPtsToWin={21}
		roundsPlayed={3}
		minRounds={5}
		matchesPlayed={12}
		minMatches={20}
		minGames={3}
		maxGames={5}
		gamesPlayed={9}
	>
		Tournament Name
	</Header>
);
