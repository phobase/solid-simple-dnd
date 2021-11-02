import { Activator } from './Activator';
import { getDistanceXY, getZeroXY, XY } from '../dom';

/**
 * Deactivates Activatable after moving distance (in px).
 */
export class DistanceDeactivator extends Activator {
  private xy: XY;

  constructor(private distance: number) {
    super();
    this.xy = getZeroXY();
  }

  checkActivationOnStart(xy: XY): void {
    this.xy = xy;
  }

  checkActivationOnMove(moveXY: XY): void {
    if (getDistanceXY(moveXY, this.xy) > this.distance) {
      this.getActivatable().deactivate();
    }
  }
}
