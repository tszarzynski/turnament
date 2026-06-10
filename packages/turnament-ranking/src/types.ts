import type { Player, Results } from "turnament-scheduler";

export type SportType = "BACKGAMMON" | "CHESS";

export interface Stats {
	omv: number;
	buchholzCut1: number;
	nps: number;
	sonnebornBerger: number;
}

export interface PlayerWithStats extends Player, Results, Stats {}
