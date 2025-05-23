import type { Match } from "turnament-scheduler";
import ReadonlyRoundCard from "./ReadonlyRoundCard";

export default {
	component: ReadonlyRoundCard,
	title: "ReadonlyRoundCard",
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
		<ReadonlyRoundCard
			matches={[match, match, match]}
			roundNum={1}
			players={players}
		/>
	);
};
