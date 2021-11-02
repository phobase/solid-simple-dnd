import { getItemIndices } from './getItemIndices';

export const getMinItemIndices = (array: number[]): number[] =>
  getItemIndices(array, (value, currentMin) => value < currentMin);
