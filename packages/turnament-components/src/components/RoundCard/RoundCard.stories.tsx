import React from "react";
import type { Match } from "turnament-scheduler";
import RoundCard from "./RoundCard";

export default {
	component: RoundCard,
	title: "RoundCard",
};

const match: Match = {
	ID: "ID",
	roundID: 1,
	hasBye: false,
	pairing: [1, 2],
	result: [0, 0],
};

const players = [
	{ name: "Name1", active: true, ID: 1 },
	{ name: "Name2", active: true, ID: 2 },
];

export const Default = () => {
	return (
		<RoundCard
			matches={[match, match, match]}
			roundNum={1}
			players={players}
			onScoreChange={() => null}
		/>
	);
};
