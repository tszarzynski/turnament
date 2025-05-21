export const clamp = (n: number, lower: number, upper: number): number =>
	Math.min(Math.max(n, lower), upper);

export const move = (arr: number[], from: number, to: number): number[] => {
	const newArr = arr.slice();
	newArr.splice(to, 0, newArr.splice(from, 1)[0]);
	return newArr;
};
