import { Activator } from './Activator';
import { XY } from '../dom';

/**
 * Activates Activatable after duration (in seconds).
 */
export class TimeActivator extends Activator {
  private timeout: NodeJS.Timeout | undefined;

  constructor(private duration: number) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkActivationOnStart(xy: XY): void {
    if (!this.timeout) {
      this.timeout = setTimeout(() => {
        this.getActivatable().activate();

        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = undefined;
        }
      }, this.duration * 1000);
    }
  }
}
