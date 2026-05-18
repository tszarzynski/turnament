import { getRanking } from "turnament-ranking";
import type { SchedulerType } from "turnament-scheduler";
import { useBaseStore } from "../../app/store";
import type { SportType } from "../../features/round/roundsSlice";
import {
	selectCurrentRound,
	selectGamesPlayed,
	selectIsRoundCompleted,
	selectMatchesPlayedNum,
	selectMinMatchesNeeded,
	selectMinRoundNeeded,
	selectRoundsPlayedNum,
} from "./roundsSlice";

// ─── Helpers ────────────────────────────────────────────────────────────────

function setupTournament(
	numPlayers: number,
	schedulerType: SchedulerType,
	sport: SportType,
	minPoints: number,
) {
	const store = useBaseStore.getState();
	store.setPlayers(
		Array.from({ length: numPlayers }, (_, i) => ({ name: `Player ${i + 1}` })),
	);
	store.setSportType(sport);
	store.setSchedulerType(schedulerType);
	store.setMinPointsToWin(minPoints);
}

function getState() {
	return useBaseStore.getState();
}

/** Completes all non-bye matches in the current round. Player at index 0 always wins. */
function completeCurrentRound(minPoints: number, scoringDivisor: number) {
	const state = getState();
	const currentRound = selectCurrentRound(state);
	for (const match of currentRound) {
		state.updateMatch({
			...match,
			result: [minPoints * scoringDivisor, 0],
		});
	}
}

/** Collects all real (non-bye) pairings as sorted "a-b" string keys. */
function collectPairKeys(matches: ReturnType<typeof getState>["matches"]) {
	return matches
		.filter((m) => !m.hasBye)
		.map(({ pairing: [a, b] }) => [a, b].sort((x, y) => x - y).join("-"));
}

// ─── Flow 1: Backgammon Swiss, 4 players, full tournament ───────────────────

test("BG Swiss 4 players: full tournament produces correct round count and no rematches", () => {
	setupTournament(4, "SWISS", "BACKGAMMON", 5);
	const minRounds = selectMinRoundNeeded(getState()); // ceil(log2(4)) = 2

	for (let round = 0; round < minRounds; round++) {
		getState().nextRound();
		expect(getState().currentRoundNum).toBe(round + 1);

		const currentRound = selectCurrentRound(getState());
		expect(currentRound.length).toBe(2);
		expect(selectIsRoundCompleted(getState())).toBe(false);

		completeCurrentRound(5, 1);
		expect(selectIsRoundCompleted(getState())).toBe(true);
		expect(selectMatchesPlayedNum(getState())).toBe((round + 1) * 2);
	}

	// selectRoundsPlayedNum = currentRoundNum - 1 (previous rounds, not current)
	expect(selectRoundsPlayedNum(getState())).toBe(minRounds - 1);

	// No pair repeated across rounds
	const pairKeys = collectPairKeys(getState().matches);
	expect(new Set(pairKeys).size).toBe(pairKeys.length);
});

test("BG Swiss 4 players: getRanking produces 4 valid players after full tournament", () => {
	setupTournament(4, "SWISS", "BACKGAMMON", 5);
	const minRounds = selectMinRoundNeeded(getState());

	for (let round = 0; round < minRounds; round++) {
		getState().nextRound();
		completeCurrentRound(5, 1);
	}

	const { players, matches } = getState();
	const ranking = getRanking(players, matches, "BACKGAMMON", 1);

	expect(ranking).toHaveLength(4);
	for (const p of ranking) {
		expect(Number.isNaN(p.omv)).toBe(false);
		expect(Number.isNaN(p.nps)).toBe(false);
		expect(Number.isNaN(p.buchholzCut1)).toBe(false);
	}
	// Player who always won has the most match wins → ranked first
	expect(ranking[0].matchesWon).toBeGreaterThanOrEqual(ranking[1].matchesWon);
});

// ─── Flow 2: Backgammon Swiss, 6 players (odd count with byes) ──────────────

test("BG Swiss 6 players: bye matches excluded from selectCurrentRound", () => {
	setupTournament(6, "SWISS", "BACKGAMMON", 5);
	getState().nextRound();

	// 6 players → 3 real matches per round, no byes needed (even count)
	const currentRound = selectCurrentRound(getState());
	expect(currentRound.length).toBe(3);
	expect(currentRound.every((m) => !m.hasBye)).toBe(true);
});

test("BG Swiss 5 players: odd count produces 1 bye match excluded from current round", () => {
	setupTournament(5, "SWISS", "BACKGAMMON", 5);
	getState().nextRound();

	// selectCurrentRound excludes byes
	const currentRound = selectCurrentRound(getState());
	expect(currentRound.length).toBe(2);

	// Store has 3 matches total (2 real + 1 bye)
	const allRound1 = getState().matches.filter((m) => m.roundID === 1);
	expect(allRound1.length).toBe(3);
	expect(allRound1.filter((m) => m.hasBye).length).toBe(1);
});

test("BG Swiss 5 players: round completes when all non-bye matches are scored", () => {
	setupTournament(5, "SWISS", "BACKGAMMON", 5);
	getState().nextRound();

	expect(selectIsRoundCompleted(getState())).toBe(false);
	completeCurrentRound(5, 1);
	expect(selectIsRoundCompleted(getState())).toBe(true);
});

test("BG Swiss 5 players: full tournament, no rematches, valid ranking", () => {
	setupTournament(5, "SWISS", "BACKGAMMON", 5);
	const minRounds = selectMinRoundNeeded(getState()); // ceil(log2(5)) = 3

	for (let round = 0; round < minRounds; round++) {
		getState().nextRound();
		completeCurrentRound(5, 1);
	}

	const pairKeys = collectPairKeys(getState().matches);
	expect(new Set(pairKeys).size).toBe(pairKeys.length);

	const { players, matches } = getState();
	const ranking = getRanking(players, matches, "BACKGAMMON", 1);
	expect(ranking).toHaveLength(5);
	for (const p of ranking) {
		expect(Number.isNaN(p.nps)).toBe(false);
	}
});

// ─── Flow 3: Chess Elimination, 4 players, full bracket ─────────────────────

test("Chess Elimination 4 players: round 1 completes with chess scoring", () => {
	setupTournament(4, "ELIMINATION", "CHESS", 2); // Best of 2
	const { scoringDivisor } = getState();
	expect(scoringDivisor).toBe(2);

	getState().nextRound();
	expect(selectCurrentRound(getState()).length).toBe(2);

	// Chess: one player wins both games → [4, 0], sum=4=2*2
	completeCurrentRound(2, 2);
	expect(selectIsRoundCompleted(getState())).toBe(true);
});

test("Chess Elimination 4 players: round 2 pairs both upper and lower bracket", () => {
	setupTournament(4, "ELIMINATION", "CHESS", 2);

	getState().nextRound();
	completeCurrentRound(2, 2);

	// After round 1: 2 players with 0 losses (upper), 2 with 1 loss (lower)
	// Elimination requires matchesLost > 1 — nobody out yet (double elimination)
	getState().nextRound();

	expect(getState().currentRoundNum).toBe(2);
	// All 4 players still active (nobody has 2 losses yet)
	const activePlayers = getState().players.filter((p) => p.active);
	expect(activePlayers.length).toBe(4);
	// Round 2: upper bracket (1 match) + lower bracket (1 match) = 2 matches
	expect(selectCurrentRound(getState()).length).toBe(2);
});

test("Chess Elimination 4 players: chess ranking sorts by gamesWon first", () => {
	setupTournament(4, "ELIMINATION", "CHESS", 2);

	getState().nextRound();
	completeCurrentRound(2, 2);
	getState().nextRound();
	completeCurrentRound(2, 2);

	const { players, matches, scoringDivisor } = getState();
	const ranking = getRanking(players, matches, "CHESS", scoringDivisor);

	expect(ranking.length).toBeGreaterThan(0);
	// Chess: primary sort is gamesWon (raw stored value); first player has most
	expect(ranking[0].gamesWon).toBeGreaterThanOrEqual(ranking[1].gamesWon);
});

// ─── Flow 4: Round Robin, 4 players, completeness invariant ─────────────────

test("Round Robin 4 players: all 6 unique pairs scheduled exactly once", () => {
	setupTournament(4, "ROUND_ROBIN", "BACKGAMMON", 5);
	const minRounds = selectMinRoundNeeded(getState()); // 3

	for (let round = 0; round < minRounds; round++) {
		getState().nextRound();
		completeCurrentRound(5, 1);
	}

	const pairKeys = collectPairKeys(getState().matches);
	const uniquePairs = new Set(pairKeys);

	// 4*(4-1)/2 = 6 unique pairs
	expect(uniquePairs.size).toBe(6);
	// Each pair appears exactly once
	expect(pairKeys.length).toBe(6);
	// selectRoundsPlayedNum = currentRoundNum - 1 = 3 - 1 = 2
	expect(selectRoundsPlayedNum(getState())).toBe(2);
});

test("Round Robin 4 players: selectMinMatchesNeeded uses exact formula", () => {
	setupTournament(4, "ROUND_ROBIN", "BACKGAMMON", 5);
	// Round Robin exposes matchesNeeded → 4*(4-1)/2 = 6
	expect(selectMinMatchesNeeded(getState())).toBe(6);
});

test("Round Robin 4 players: selectGamesPlayed sums all match scores", () => {
	setupTournament(4, "ROUND_ROBIN", "BACKGAMMON", 5);
	const minRounds = selectMinRoundNeeded(getState());

	for (let round = 0; round < minRounds; round++) {
		getState().nextRound();
		completeCurrentRound(5, 1); // each match: [5, 0], sum = 5
	}

	// 6 matches × 5 points each = 30
	expect(selectGamesPlayed(getState())).toBe(30);
});

// ─── Flow 5: Reset and restart ───────────────────────────────────────────────

test("Reset: clears all state and allows fresh tournament start", () => {
	setupTournament(4, "SWISS", "BACKGAMMON", 5);
	getState().nextRound();

	// Confirm something is in state
	expect(getState().matches.length).toBeGreaterThan(0);
	expect(getState().currentRoundNum).toBe(1);

	getState().resetPlayers();
	getState().resetRounds();

	const state = getState();
	expect(state.matches).toHaveLength(0);
	expect(state.currentRoundNum).toBe(0);
	expect(state.players).toHaveLength(0);
	expect(state.sportType).toBeUndefined();
	expect(state.scoringDivisor).toBe(1);
	// selectIsRoundCompleted with no current round: [].every() is vacuously true
	// The meaningful check is that there are no matches at all
	expect(state.matches).toHaveLength(0);
	expect(selectMinMatchesNeeded(state)).toBe(0);
});

test("Reset: fresh tournament starts correctly after reset", () => {
	setupTournament(4, "SWISS", "BACKGAMMON", 5);
	getState().nextRound();
	getState().resetPlayers();
	getState().resetRounds();

	// Start a completely new tournament
	setupTournament(2, "ROUND_ROBIN", "CHESS", 2);
	getState().nextRound();

	expect(getState().currentRoundNum).toBe(1);
	expect(getState().players).toHaveLength(2);
	expect(selectCurrentRound(getState()).length).toBe(1);
});
