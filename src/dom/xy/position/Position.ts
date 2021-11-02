import { getNewXY, getZeroXY, XY } from '../xy';

/**
 * Position is a point on the screen, it is relative to window (0, 0).
 */
export type Position = XY;

export const getNewPosition = getNewXY;

export const getZeroPosition = getZeroXY;
