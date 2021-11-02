import { getDistanceXY, getRect, getRectCorners, Rect } from '../dom';
import { getMinItemIndices } from '../functor';
import { Detector } from './Detector';

/**
 * Detects ref based on corners of otherRefs.
 */
export class CornerDetector extends Detector {
  detect(rect: Rect, otherRefs: HTMLElement[]): HTMLElement[] {
    const corners = getRectCorners(rect);

    const distances = otherRefs.map(otherRef => {
      const otherCorners = getRectCorners(getRect(otherRef));
      const distances = corners.reduce((distance, corner, index) => {
        return distance + getDistanceXY(otherCorners[index], corner);
      }, 0);

      return Number((distances / 4).toFixed(4));
    });

    const minItemIndices = getMinItemIndices(distances);

    return otherRefs.filter((_, index) => minItemIndices.includes(index));
  }
}
