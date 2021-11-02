import { getNewXY, XY } from '../xy';

/**
 * Returns (x, y) of a mouse event.
 *
 * It should be relative to window (0, 0).
 *
 * @param event
 */
export const getMouseXY = (event: MouseEvent): XY => getNewXY(event.clientX, event.clientY);
