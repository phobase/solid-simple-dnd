/**
 * Returns the indices of the items based on compareFn
 */
export const getItemIndices = (
  array: number[],
  compareFn: (item: number, currentItem: number) => boolean,
): number[] => {
  if (array.length === 0) {
    return [];
  }

  let current = array[0];

  array.forEach(item => {
    if (compareFn(item, current)) {
      current = item;
    }
  });

  const indices: number[] = [];
  array.forEach((item, index) => {
    if (current === item) {
      indices.push(index);
    }
  });

  return indices;
};
