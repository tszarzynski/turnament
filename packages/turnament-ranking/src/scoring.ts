import type { MatchResult, SchedulerType } from "turnament-scheduler";
import type { SportType } from "./types";

export const DEFAULT_POINTS_TO_WIN = 5;

export const getScoringDivisor = (sport: SportType): number =>
	sport === "CHESS" ? 2 : 1;

export const getDefaultMatchConfig = (
	sport: SportType,
	schedulerType: SchedulerType | undefined,
): number => {
	if (sport === "CHESS") {
		return schedulerType === "ELIMINATION" ? 2 : 1;
	}
	return DEFAULT_POINTS_TO_WIN;
};

export const isMatchCompleted = (
	result: MatchResult,
	sport: SportType | undefined,
	minPointsToWin: number,
): boolean => {
	if (sport === "CHESS") {
		return result[0] + result[1] === minPointsToWin * 2;
	}
	return result.some((score) => score >= minPointsToWin);
};

export const formatScore = (raw: number, divisor: number): string => {
	const display = raw / divisor;
	return Number.isInteger(display) ? String(display) : display.toFixed(1);
};
