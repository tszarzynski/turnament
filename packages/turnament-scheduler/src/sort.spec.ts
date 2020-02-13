import { sortWith, desc, asc } from "./sort";

test("sorWith should return soretd array", () => {
  const arr = [
    { primary: 1, secondary: 2 },
    { primary: 2, secondary: 1 }
  ];

  expect(sortWith<{primary: number}>([asc("primary")])(arr)).toStrictEqual([
    { primary: 1, secondary: 2 },
    { primary: 2, secondary: 1 }
  ]);

  expect(sortWith<{primary: number}>([desc("primary")])(arr)).toStrictEqual([
    { primary: 2, secondary: 1 },
    { primary: 1, secondary: 2 }
  ]);
});

test("sorWith should return array sorted by secondary key", () => {
  const arr = [
    { primary: 1, secondary: 2 },
    { primary: 1, secondary: 1 }
  ];

  expect(sortWith<{primary: number, secondary: number}>([asc("primary"), asc("secondary")])(arr)).toStrictEqual([
    { primary: 1, secondary: 1 },
    { primary: 1, secondary: 2 }
  ]);

  expect(sortWith<{primary: number, secondary: number}>([desc("primary"), desc("secondary")])(arr)).toStrictEqual([
    { primary: 1, secondary: 2 },
    { primary: 1, secondary: 1 }
  ]);
});
