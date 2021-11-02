import { getMaxItemIndices } from './getMaxItemIndices';
import { expect } from '@playwright/test';

describe('given I call getMaxItemIndies', () => {
  describe('when array is empty', () => {
    test('then it should return empty array', () => {
      expect(getMaxItemIndices([])).toEqual([]);
    });
  });

  describe('when array has a max item', () => {
    test('then it should return index of that item', () => {
      expect(getMaxItemIndices([1, 3, 2])).toEqual([1]);
    });
  });

  describe('when array has 2 max items', () => {
    test('then it should return indices of 2 items', () => {
      expect(getMaxItemIndices([1, 2, 1, 3, 2, 3])).toEqual([3, 5]);
    });
  });

  describe('when array has multiple max items', () => {
    test('then it should return indices of those items', () => {
      expect(getMaxItemIndices([3, 1, 3, 2, 1, 3, 2, 3])).toEqual([0, 2, 5, 7]);
    });
  });
});
