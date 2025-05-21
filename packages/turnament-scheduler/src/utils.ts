import type { Match } from "./types";

/**
 * Count occurrences of number in Array
 */
export const countOccurrences = (arr: number[]): Map<number, number> =>
	arr.reduce(
		(acc, val) => acc.set(val, 1 + (acc.get(val) || 0)),
		new Map<number, number>(),
	);

/**
 * Returns last element from array
 */
export const first = <T>(arr: T[]): T => arr[0];

/**
 * Returns last element from array
 */
export const last = <T>(arr: T[]): T => arr[arr.length - 1];

export const prop =
	<T, P extends keyof T>(propName: P): ((obj: T) => T[P]) =>
	(obj: T) =>
		obj[propName];

/** Check if number is odd */
export const isOdd = (n: number): boolean => n % 2 !== 0;

/** Check if number is even */
export const isEven = (n: number): boolean => !isOdd(n);

export const calcNumRoundsFromResults = (results: Match[]): number =>
	new Set(results.map((results) => results.roundID)).size;

/** Returns the nearest power of 2 */
export const nextPowOf2 = (n: number): number =>
	2 ** Math.ceil(Math.log(n) / Math.log(2));

/** Checks if number is power of 2 */
export const isPowOf2 = (n: number): boolean => n !== 0 && (n & (n - 1)) === 0;
