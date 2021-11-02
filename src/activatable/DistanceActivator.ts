import { Activator } from './Activator';
import { getDistanceXY, getZeroXY, XY } from '../dom';

/**
 * Activates Activatable by moving distance (in px).
 */
export class DistanceActivator extends Activator {
  protected xy: XY;

  constructor(protected distance: number) {
    super();
    this.xy = getZeroXY();
  }

  checkActivationOnStart(xy: XY): void {
    this.xy = xy;
  }

  checkActivationOnMove(moveXY: XY): void {
    if (getDistanceXY(moveXY, this.xy) > this.distance) {
      this.getActivatable().activate();
    }
  }
}
