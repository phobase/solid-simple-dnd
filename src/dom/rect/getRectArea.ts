import { Rect } from './Rect';

/**
 * Returns area of a rect.
 *
 * @param rect
 */
export const getRectArea = (rect: Rect): number => {
  return rect.width * rect.height;
};
