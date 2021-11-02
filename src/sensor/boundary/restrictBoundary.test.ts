import { restrictBoundary } from './restrictBoundary';
import { genRect, genTranslate } from '../../../test/gen';

describe('given I call restrictBoundary', () => {
  test('rect x should not be smaller than boundaryRect x', () => {
    const translate = genTranslate({ x: -11 });
    const newTranslate = restrictBoundary(translate, genRect({ x: 10 }), genRect({ x: 0 }));
    expect(newTranslate.x).toEqual(-10);
  });

  test('rect x + width should not be bigger then boundaryRect x + width', () => {
    const translate = genTranslate({ x: 11 });
    const newTranslate = restrictBoundary(translate, genRect({ width: 90, x: 0 }), genRect({ width: 100, x: 0 }));
    expect(newTranslate.x).toEqual(10);
  });

  test('rect y should not be smaller than boundaryRect y', () => {
    const translate = genTranslate({ y: -11 });
    const newTranslate = restrictBoundary(translate, genRect({ y: 10 }), genRect({ y: 0 }));
    expect(newTranslate.y).toEqual(-10);
  });

  test('rect y + height should not be bigger than boundaryRect y + height', () => {
    const translate = genTranslate({ y: 11 });
    const newTranslate = restrictBoundary(translate, genRect({ height: 90, y: 0 }), genRect({ height: 100, y: 0 }));
    expect(newTranslate.y).toEqual(10);
  });
});
