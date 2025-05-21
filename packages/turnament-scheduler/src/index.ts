import { scheduler as AmalfiScheduler } from "./tournament/amalfi";
import { scheduler as EliminationScheduler } from "./tournament/elimination";
import { scheduler as RoundRobinScheduler } from "./tournament/roundrobin";
import { scheduler as SwissScheduler } from "./tournament/swiss";
import type { Scheduler, SchedulerType } from "./types";

export { getRanking } from "./rank";
export * from "./types";
export * from "./consts";

export function getSchedulerByType(type: SchedulerType): Scheduler {
	switch (type) {
		case "ROUND_ROBIN":
			return RoundRobinScheduler;
		case "SWISS":
			return SwissScheduler;
		case "ELIMINATION":
			return EliminationScheduler;
		case "AMALFI":
			return AmalfiScheduler;
		default:
			return RoundRobinScheduler;
	}
}

export const implementedSchedulers: SchedulerType[] = [
	"ROUND_ROBIN",
	"SWISS",
	"ELIMINATION",
	"AMALFI",
];
