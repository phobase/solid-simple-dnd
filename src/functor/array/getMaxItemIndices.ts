import { getItemIndices } from './getItemIndices';

export const getMaxItemIndices = (array: number[]): number[] =>
  getItemIndices(array, (item, currentMax) => item > currentMax);
