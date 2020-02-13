import { countOccurences, isEven, isOdd, last } from "./utils";

test("countOccurences should return", () => {
  const arr = [1, 2, 2];
  const res = new Map();
  res.set(1, 1);
  res.set(2, 2);

  expect(countOccurences(arr)).toMatchObject(res);
});

test("last should return", () => {
  expect(last([1, 2, 3])).toBe(3);
});

test("idOdd should return", () => {
  expect(isOdd(3)).toBe(true);
  expect(isOdd(2)).toBe(false);
});

test("isEven should return", () => {
  expect(isEven(2)).toBe(true);
  expect(isEven(3)).toBe(false);
});
