import type { SchedulerType } from "turnament-scheduler";

type SchedulerOption = {
	value: SchedulerType;
	name: string;
};

export const schedulerOptions: SchedulerOption[] = [
	{ value: "ROUND_ROBIN", name: "Round Robin" },
	{ value: "ELIMINATION", name: "Elimination" },
	{ value: "SWISS", name: "Swiss" },
	{ value: "AMALFI", name: "Amalfi" },
];

export const getSchedulerNameByType = (value: SchedulerType) =>
	schedulerOptions.find((it) => it.value === value)?.name ?? "";
