import { roundsNeeded, matchesNeeded } from './rounds';

test('roundsNeeded should calculate number of rounds', () => {
  expect(roundsNeeded(16)).toBe(15);
});

test('roundsNeeded should calculate number of rounds', () => {
  expect(roundsNeeded(128)).toBe(127);
});

test('roundsNeeded should calculate number of rounds', () => {
  expect(roundsNeeded(15)).toBe(15);
});

test('matchesNeeded should calculate number of rounds', () => {
  expect(matchesNeeded(16)).toBe(120);
});

test('matchesNeeded should calculate number of rounds', () => {
  expect(matchesNeeded(128)).toBe(8128);
});

test('matchesNeeded should calculate number of rounds', () => {
  expect(matchesNeeded(15)).toBe(105);
});
