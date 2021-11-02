import { expect } from '@playwright/test';
import { getMinItemIndices } from './getMinItemIndices';

describe('given I call getMinItemIndies', () => {
  describe('when array is empty', () => {
    test('then it should return empty array', () => {
      expect(getMinItemIndices([])).toEqual([]);
    });
  });

  describe('when array has a max item', () => {
    test('then it should return index of that item', () => {
      expect(getMinItemIndices([1, -3, 2])).toEqual([1]);
    });
  });

  describe('when array has 2 max items', () => {
    test('then it should return indices of 2 items', () => {
      expect(getMinItemIndices([1, 2, 1, -3, 2, -3])).toEqual([3, 5]);
    });
  });

  describe('when array has multiple max items', () => {
    test('then it should return indices of those items', () => {
      expect(getMinItemIndices([-3, 1, -3, 2, 1, -3, 2, -3])).toEqual([0, 2, 5, 7]);
    });
  });
});
