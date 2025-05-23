import { renderHook } from "vitest-browser-react";
import { BYE_ID, type Match, type Player } from "turnament-scheduler";
import usePlayerNames from "./usePlayerNames";

describe("usePlayerNames", () => {
	// Mock data
	const mockPlayers: Player[] = [
		{
			ID: 1,
			name: "Alice",
			active: true,
		},
		{
			ID: 2,
			name: "Bob",
			active: true,
		},
		{
			ID: 3,
			name: "Charlie",
			active: true,
		},
		{
			ID: 4,
			name: "Dave",
			active: true,
		},
	];

	const mockMatches: Match[] = [
		{ ID: "101", pairing: [1, 2], result: [0, 0], roundID: 1, hasBye: false },
		{ ID: "102", pairing: [3, 4], result: [0, 0], roundID: 1, hasBye: false },
		{
			ID: "103",
			pairing: [1, BYE_ID],
			result: [0, 0],
			roundID: 1,
			hasBye: true,
		},
	];

	it("should return correctly mapped player names", () => {
		const { result } = renderHook(() =>
			usePlayerNames(mockPlayers, mockMatches),
		);

		expect(result.current).toEqual([
			["Alice", "Bob"],
			["Charlie", "Dave"],
			["Alice", "BYE"],
		]);
	});

	it("should handle empty matches array", () => {
		const { result } = renderHook(() => {
			expect(() => usePlayerNames(mockPlayers, [])).toThrow(
				"Matches array cannot be empty",
			);
			return [];
		});
		expect(result.current).toEqual([]);
	});

	it("should throw error if players array is empty", () => {
		const { result } = renderHook(() => {
			expect(() => usePlayerNames([], mockMatches)).toThrow(
				"Players array cannot be empty",
			);
			return [];
		});
		expect(result.current).toEqual([]);
	});
});
