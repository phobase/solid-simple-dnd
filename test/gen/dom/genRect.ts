import { Rect } from '../../../src';
import { genNumber } from './genNumber';

export const genRect = (partial: Partial<Rect>): Rect => ({
  x: genNumber(),
  y: genNumber(),
  width: genNumber(),
  height: genNumber(),
  ...partial,
});
