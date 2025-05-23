import type { SchedulerType } from "turnament-scheduler";
import { assert } from "es-toolkit";

type SchedulerOption = {
	value: SchedulerType;
	name: string;
	shortName: string;
};

export const schedulerOptions: SchedulerOption[] = [
	{ value: "ROUND_ROBIN", name: "Round Robin", shortName: "RR" },
	{ value: "ELIMINATION", name: "Elimination", shortName: "Elim" },
	{ value: "SWISS", name: "Swiss", shortName: "Swiss" },
	{ value: "AMALFI", name: "Amalfi", shortName: "Swiss" },
];

export const getSchedulerByType = (value: SchedulerType) => {
	const option = schedulerOptions.find((it) => it.value === value);

	assert(option, "TThis value was promised to be there.");

	return option;
};
