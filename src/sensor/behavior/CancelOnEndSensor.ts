import { Draggable } from '../../draggable';
import { Sensor } from '../Sensor';

/**
 * Cancels dragging when it ends.
 *
 * It should reset Draggable back to it original position if desired state hasn't met (such as not suitable Droppable).
 */
export class CancelOnEndSensor extends Sensor {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEnd(draggable: Draggable): void {
    this.getDraggableActions().cancel();
  }
}
