import { Translate } from '../../../src';
import { genNumber } from './genNumber';

export const genTranslate = (partial: Partial<Translate>): Translate => ({
  x: genNumber(),
  y: genNumber(),
  ...partial,
});
