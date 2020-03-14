export const clamp = (n: number, lower: number, upper: number) =>
  Math.min(Math.max(n, lower), upper);
export const move = (arr: number[], from: number, to: number) => {
  const newArr = arr.slice();
  newArr.splice(to, 0, newArr.splice(from, 1)[0]);
  return newArr;
};

export const shuffleArray = (array: number[]) => {
  const newArray = array.slice();

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};
