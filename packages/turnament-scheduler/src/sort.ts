import { curry } from "ramda";

export function asc<T, K extends keyof T>(prop: K) {
  return (a: T, b: T) => {
    if (a[prop] > b[prop]) return 1;
    if (a[prop] < b[prop]) return -1;

    return 0;
  };
}

export function desc<T, K extends keyof T>(prop: K) {
  return (a: T, b: T) => {
    if (a[prop] > b[prop]) return -1;
    if (a[prop] < b[prop]) return 1;

    return 0;
  };
}


export function sortWith<T>(compareFuncs: Array<(a: T, b: T) => number>) {
  return (arr: T[]) => arr.slice().sort((a, b) => {
    let result = 0;
    let i = 0;
    while (result === 0 && i < compareFuncs.length) {
      result = compareFuncs[i](a, b);
      i += 1;
    }
    return result;
  });
};


