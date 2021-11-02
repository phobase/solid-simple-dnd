import { getRect, Rect } from '../dom';
import { getMaxItemIndices } from '../functor';
import { Detector } from './Detector';

/**
 * Detects refs based on greatest intersect area.
 */
export class IntersectDetector extends Detector {
  detect(rect: Rect, otherRefs: HTMLElement[]): HTMLElement[] {
    const rects = otherRefs.map(otherRef => getRect(otherRef));

    const intersects = rects.map(r => getIntersect(r, rect));

    const maxItemIndices = getMaxItemIndices(intersects);

    if (maxItemIndices.length > 0 && intersects[maxItemIndices[0]] === 0) {
      return [];
    }

    return otherRefs.filter((_, index) => maxItemIndices.includes(index));
  }
}

/**
 * Returns the intersect area between two rects.
 */
const getIntersect = (rect1: Rect, rect2: Rect): number => {
  const x1 = rect1.x,
    y1 = rect1.y,
    xMax1 = rect1.x + rect1.width,
    yMax1 = rect1.y + rect1.height,
    x2 = rect2.x,
    y2 = rect2.y,
    xMax2 = rect2.x + rect2.width,
    yMax2 = rect2.y + rect2.height;

  const width = Math.max(0, Math.min(xMax1, xMax2) - Math.max(x1, x2));
  const height = Math.max(0, Math.min(yMax1, yMax2) - Math.max(y1, y2));

  return width * height;
};
