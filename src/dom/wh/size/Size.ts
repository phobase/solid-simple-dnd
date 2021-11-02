export type Size = {
  height: number;
  width: number;
};

export const getZeroSize = (): Size => ({ width: 0, height: 0 });

export const getNewSize = (width: number, height: number): Size => ({ width, height });
