import React, { useState } from "react";
import type { Match } from "turnament-scheduler";
import MatchCard from "./MatchCard";

export default {
	component: MatchCard,
	title: "MatchCard",
};

const names: [string, string] = ["Name1", "Name2"];

export const Default = () => {
	const [match, setMatch] = useState<Match>({
		ID: "ID",
		roundID: 1,
		hasBye: false,
		pairing: [1, 2],
		result: [0, 0],
	});

	return (
		<MatchCard
			match={match}
			names={names}
			onScoreChange={(matchToUpdate) => setMatch(matchToUpdate)}
		/>
	);
};

export const Primary = () => {
	const [match, setMatch] = useState<Match>({
		ID: "ID",
		roundID: 1,
		hasBye: false,
		pairing: [1, 2],
		result: [0, 0],
	});

	return (
		<MatchCard
			match={match}
			names={names}
			onScoreChange={(matchToUpdate) => setMatch(matchToUpdate)}
			variant="primary"
		/>
	);
};

export const Disabled = () => {
	const [match, setMatch] = useState<Match>({
		ID: "ID",
		roundID: 1,
		hasBye: false,
		pairing: [1, 2],
		result: [0, 0],
	});

	return (
		<MatchCard
			match={match}
			names={names}
			onScoreChange={(matchToUpdate) => setMatch(matchToUpdate)}
			disabled={true}
		/>
	);
};
