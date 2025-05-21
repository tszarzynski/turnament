type SortResult = -1 | 0 | 1;

export const asc =
	<T, K extends keyof T>(prop: K) =>
	(a: T, b: T): SortResult => {
		if (a[prop] > b[prop]) return 1;
		if (a[prop] < b[prop]) return -1;

		return 0;
	};

export const desc =
	<T, K extends keyof T>(prop: K) =>
	(a: T, b: T): SortResult => {
		if (a[prop] > b[prop]) return -1;
		if (a[prop] < b[prop]) return 1;

		return 0;
	};

export const sortWith =
	<T>(compareFuncs: Array<(a: T, b: T) => number>) =>
	(arr: T[]): T[] =>
		arr.slice().sort((a, b) => {
			let result = 0;
			let i = 0;
			while (result === 0 && i < compareFuncs.length) {
				result = compareFuncs[i](a, b);
				i += 1;
			}
			return result;
		});
