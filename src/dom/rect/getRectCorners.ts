import { getNewPosition, Position } from '../xy';
import { Rect } from './Rect';

/**
 * Returns the positions of the corners of a given rect.
 *
 * [top left (x, y), top right (x, y), bottom left (x, y), bottom right (x, y)]
 */
export const getRectCorners = (rect: Rect): Position[] => [
  getNewPosition(rect.x, rect.y),
  getNewPosition(rect.x + rect.width, rect.y),
  getNewPosition(rect.x, rect.y + rect.height),
  getNewPosition(rect.x + rect.width, rect.y + rect.height),
];
