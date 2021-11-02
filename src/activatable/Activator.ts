import { Activatable } from './index';
import { XY } from '../dom';

/**
 * Controls when to activate or deactivate Activatable.
 */
export abstract class Activator {
  private activatable: Activatable;

  getActivatable(): Activatable {
    if (!this.activatable) {
      throw Error('Activator requires Activatable to be defined');
    }

    return this.activatable;
  }

  setActivatable(activatable: Activatable): void {
    this.activatable = activatable;
  }

  /**
   * Checks activation when Activatable starts, xy is xy of Activatable at that point.
   *
   * @param xy
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkActivationOnStart(xy: XY): void {
    //
  }

  /**
   * Checks during Activatable move, moveXY is xy of Activatable at the point.
   *
   * @param moveXY
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkActivationOnMove(moveXY: XY): void {
    //
  }
}
