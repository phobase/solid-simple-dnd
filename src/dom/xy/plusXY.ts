import { XY } from './xy';

/**
 * Pluses xy1 and xy2.
 *
 * NOTE: this mutates xy1.
 *
 * The reason for mutation is that in onMove and onScroll we expect to mutate moveXY and scrollXY. Mutation simplifies
 * the function compared to returning variables.
 *
 * @param xy1
 * @param xy2
 */
export const plusXY = <XY1 extends XY, XY2 extends XY>(xy1: XY1, xy2: XY2): XY1 => {
  xy1.x = xy1.x + xy2.x;
  xy1.y = xy1.y + xy2.y;

  return xy1;
};
