import { describe, it, expect } from "vitest";
import { clamp, move } from "./arrayUtils";

describe("clamp", () => {
	it("should return the same number if it is within the range", () => {
		expect(clamp(5, 0, 10)).toBe(5);
	});

	it("should return the lower bound if the number is less than the lower bound", () => {
		expect(clamp(-5, 0, 10)).toBe(0);
	});

	it("should return the upper bound if the number is greater than the upper bound", () => {
		expect(clamp(15, 0, 10)).toBe(10);
	});

	it("should handle equal bounds", () => {
		expect(clamp(5, 7, 7)).toBe(7);
	});
});

describe("move", () => {
	it("should move an element from one position to another within an array", () => {
		const array = [1, 2, 3, 4, 5];
		const result = move(array, 1, 3);
		expect(result).toEqual([1, 3, 4, 2, 5]);
	});

	it("should not modify the original array", () => {
		const array = [1, 2, 3, 4, 5];
		move(array, 1, 3);
		expect(array).toEqual([1, 2, 3, 4, 5]);
	});

	it("should handle moving an element to an earlier position", () => {
		const array = [1, 2, 3, 4, 5];
		const result = move(array, 3, 1);
		expect(result).toEqual([1, 4, 2, 3, 5]);
	});

	it("should handle moving an element to the same position", () => {
		const array = [1, 2, 3, 4, 5];
		const result = move(array, 2, 2);
		expect(result).toEqual([1, 2, 3, 4, 5]);
	});

	it("should handle empty arrays", () => {
		const array: number[] = [];
		const result = move(array, 0, 0);
		expect(result).toEqual([]);
	});
});
