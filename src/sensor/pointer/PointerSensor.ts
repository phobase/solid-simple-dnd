import { XY } from '../../dom';

export interface PointerSensor {
  /**
   * Returns XY, other sensor might want to get XY from PointerSensor to do extra detection.
   */
  getXY(): XY;
}
