import { getNewXY, plusXY, XY } from '../xy';
import { Rect } from './Rect';

/**
 * Returns center position of a rect.
 *
 * @param rect
 */
export const getRectCenter = (rect: Rect): XY => {
  return plusXY(getNewXY(rect.width * 0.5, rect.height * 0.5), getNewXY(rect.x, rect.y));
};
