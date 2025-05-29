import type { SchedulerType } from "turnament-scheduler";
import { assert } from "es-toolkit";

type SchedulerOption = {
	value: SchedulerType;
	name: string;
	shortName: string;
	description: string;
};

export const schedulerOptions: SchedulerOption[] = [
	{
		value: "ROUND_ROBIN",
		name: "Round Robin",
		shortName: "RR",
		description:
			"A Round Robin tournament is a competition format where each participant competes against every other participant exactly once, ensuring equal opportunity and comprehensive matchups.",
	},
	{
		value: "ELIMINATION",
		name: "Elimination",
		shortName: "Elim",
		description:
			"An Elimination tournament is a competition format where participants are progressively eliminated after a single loss, with matches narrowing down the field until only one competitor remains as the champion.",
	},
	{
		value: "SWISS",
		name: "Swiss",
		shortName: "Swiss",
		description:
			"A Swiss tournament is a non-elimination format where competitors play a fixed number of rounds against opponents with similar current standings, efficiently determining rankings without requiring every participant to face all others.",
	},
	{
		value: "AMALFI",
		name: "Amalfi",
		shortName: "Swiss",
		description:
			"An Amalfi tournament is a modified Swiss-style format that pairs participants with similar records while optimizing match diversity, providing balanced competition with fewer rounds than a Round Robin system.",
	},
];

export const getSchedulerByType = (value: SchedulerType) => {
	const option = schedulerOptions.find((it) => it.value === value);

	assert(option, "This value was promised to be there.");

	return option;
};
