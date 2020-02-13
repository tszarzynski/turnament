import { Match } from "./types";

/**
 * Count occurances of elements in Array
 * @param arr Array of numbers
 */
export function countOccurences(arr: number[]) {
  return arr.reduce(
    (acc, val) => acc.set(val, 1 + (acc.get(val) || 0)),
    new Map<number, number>()
  );
}

/**
 * Returns last element from array
 * @param arr
 */
export function last<T>(arr: T[]) {
  return arr[arr.length - 1];
}

export function prop<T, P extends keyof T>(propName: P): (obj: T) => T[P] {
  return (obj: T) => {
    return obj[propName];
  };
}

/**
 * Check if number is odd
 * @param n Number
 */
export function isOdd(n: number) {
  return n % 2 !== 0;
}

/**
 * Check if number is even
 * @param n Number
 */
export function isEven(n: number) {
  return !isOdd(n);
}

export function calcNumRoundsFromResults(results: Match[]) {
  return new Set(results.map(results => results.roundID)).size;
}
