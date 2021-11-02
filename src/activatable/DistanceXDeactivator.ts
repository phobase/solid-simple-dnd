import { XY } from '../dom';
import { DistanceActivator } from './DistanceActivator';

/**
 * Deactivates Activatable after moving distance (in px) on x axis.
 */
export class DistanceXDeactivator extends DistanceActivator {
  checkActivationOnMove(moveXY: XY): void {
    if (Math.abs(moveXY.x - this.xy.x) > this.distance) {
      this.getActivatable().deactivate();
    }
  }
}
