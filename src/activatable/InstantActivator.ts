import { Activator } from './Activator';
import { XY } from '../dom';

/**
 * Activates Activatable when it starts.
 */
export class InstantActivator extends Activator {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkActivationOnStart(xy: XY): void {
    this.getActivatable().activate();
  }
}
