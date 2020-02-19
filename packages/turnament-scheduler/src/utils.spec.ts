import {
  countOccurences,
  isEven,
  isOdd,
  last,
  nextPowOf2,
  isPowOf2,
  calcNumRoundsFromResults,
} from './utils';
import { Match } from './types';

test('countOccurences should return', () => {
  const arr = [1, 2, 2];
  const res = new Map();
  res.set(1, 1);
  res.set(2, 2);

  expect(countOccurences(arr)).toMatchObject(res);
});

test('last should return', () => {
  expect(last([1, 2, 3])).toBe(3);
});

test('idOdd should return', () => {
  expect(isOdd(3)).toBe(true);
  expect(isOdd(2)).toBe(false);
});

test('isEven should return', () => {
  expect(isEven(2)).toBe(true);
  expect(isEven(3)).toBe(false);
});

test('calcNumRoundsFromResults', () => {
  const rounds: Match[] = [
    {
      ID: '123',
      roundID: 1,
      pairing: [0, 0],
      result: [0, 0],
      hasBye: false,
    },
    {
      ID: '456',
      roundID: 2,
      pairing: [0, 0],
      result: [0, 0],
      hasBye: false,
    },
  ];

  expect(calcNumRoundsFromResults([])).toBe(0);
  expect(calcNumRoundsFromResults(rounds)).toBe(2);
});

test('findNearestPowOf2 should return', () => {
  expect(nextPowOf2(7)).toBe(8);
  expect(nextPowOf2(15)).toBe(16);
  expect(nextPowOf2(5)).toBe(8);
  expect(nextPowOf2(12)).toBe(16);
  expect(nextPowOf2(8)).toBe(8);
  expect(nextPowOf2(16)).toBe(16);
});

test('isPowOf2 should return', () => {
  expect(isPowOf2(7)).toBe(false);
  expect(isPowOf2(15)).toBe(false);
  expect(isPowOf2(8)).toBe(true);
  expect(isPowOf2(16)).toBe(true);
});
