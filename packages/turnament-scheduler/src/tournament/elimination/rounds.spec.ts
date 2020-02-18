import { roundsNeeded, matchesNeeded } from './rounds';

test('roundsNeeded should calculate number of rounds', () => {
  expect(roundsNeeded(16)).toBe(6);
});

test('roundsNeeded should calculate number of rounds', () => {
  expect(roundsNeeded(128)).toBe(10);
});

test('matchesNeeded should calculate number of rounds', () => {
  expect(matchesNeeded(16)).toBe(30);
});

test('matchesNeeded should calculate number of rounds', () => {
  expect(matchesNeeded(128)).toBe(254);
});
