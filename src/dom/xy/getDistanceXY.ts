import { XY } from './xy';

/**
 * Returns distance between 2 xy.
 *
 * @param xy1
 * @param xy2
 */
export const getDistanceXY = <XY1 extends XY, XY2 extends XY>(xy1: XY1, xy2: XY2): number =>
  Math.sqrt(Math.pow(xy1.x - xy2.x, 2) + Math.pow(xy1.y - xy2.y, 2));
