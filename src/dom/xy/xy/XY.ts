export type XY = {
  x: number;
  y: number;
};

export const getNewXY = (x: number, y: number): XY => ({
  x,
  y,
});

export const getZeroXY = (): XY => getNewXY(0, 0);
