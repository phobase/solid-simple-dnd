import { Draggable } from '../../draggable';
import { Sensor } from '../Sensor';
import { getNewXY, XY } from '../../dom';
import { clone } from '../../functor';

/**
 * Senses vertical position.
 *
 * It should only allow Draggable to move vertically.
 */
export class VerticalSensor extends Sensor {
  onMove(draggable: Draggable, moveXY: XY): void {
    moveXY.x = -draggable.getScrollXY().x;
  }

  onScroll(draggable: Draggable, scrollXY: XY): void {
    const moveXY = clone(draggable.getMoveXY());
    draggable.setMoveXY(getNewXY(-scrollXY.x, moveXY.y));
  }
}
