import { getDistanceXY, getRect, getRectCenter, Rect } from '../dom';
import { getMinItemIndices } from '../functor';
import { Detector } from './Detector';

/**
 * Detects refs based on distance between their centers.
 */
export class CenterDetector extends Detector {
  detect(rect: Rect, otherRefs: HTMLElement[]): HTMLElement[] {
    const center = getRectCenter(rect);

    const distances = otherRefs.map(otherRef => getDistanceXY(center, getRectCenter(getRect(otherRef))));

    const minItemIndices = getMinItemIndices(distances);

    return otherRefs.filter((_, index) => minItemIndices.includes(index));
  }
}
