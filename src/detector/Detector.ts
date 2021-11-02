import { Rect } from '../dom';

/**
 * Detector returns refs from otherRefs, which are considered to be detected by rect based on certain condition.
 *
 * It should return [] if no otherRefs satisfied condition.
 *
 * NOTE: You should filter ref (represeted by rect) from otherRefs if you do not want ref itself to be always detected.
 */
export abstract class Detector {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  detect(rect: Rect, otherRefs: HTMLElement[]): HTMLElement[] {
    return [];
  }
}
