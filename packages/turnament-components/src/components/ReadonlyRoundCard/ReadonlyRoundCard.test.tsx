import { render } from "vitest-browser-react";
import ReadonlyRoundCard from "./ReadonlyRoundCard";
import type { Match } from "turnament-scheduler";

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

describe("ReadonlyRoundCard", () => {
	it("renders without error", () => {
		const { asFragment } = render(
			<ReadonlyRoundCard
				matches={[match, match, match]}
				roundNum={1}
				players={players}
			/>,
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
