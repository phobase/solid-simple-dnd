import { Size } from './size';

export const plusWH = <XY1 extends Size, XY2 extends Size>(xy1: XY1, xy2: XY2): XY1 => ({
  ...xy1,
  width: xy1.width + xy2.width,
  height: xy1.height + xy2.height,
});
