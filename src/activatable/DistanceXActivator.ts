import { XY } from '../dom';
import { DistanceActivator } from './DistanceActivator';

/**
 * Activates Activatable after moving distance (in px) on x axis.
 */
export class DistanceXActivator extends DistanceActivator {
  checkActivationOnMove(moveXY: XY): void {
    if (Math.abs(moveXY.x - this.xy.x) > this.distance) {
      this.getActivatable().activate();
    }
  }
}
