/**
 * Simplify version of DOMRect as these information is enough for most of our operation.
 *
 * Rect (x, y) is relative to window (0, 0)
 */
export type Rect = {
  x: number;
  y: number;
  height: number;
  width: number;
};

export const getNewRect = (x: number, y: number, width: number, height: number): Rect => ({
  x,
  y,
  width,
  height,
});
