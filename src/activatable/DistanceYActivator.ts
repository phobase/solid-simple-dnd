import { XY } from '../dom';
import { DistanceActivator } from './DistanceActivator';

/**
 * Activates Activatable after moving distance (in px) on y axis.
 */
export class DistanceYActivator extends DistanceActivator {
  checkActivationOnMove(moveXY: XY): void {
    if (Math.abs(moveXY.y - this.xy.y) > this.distance) {
      this.getActivatable().activate();
    }
  }
}
