import { Draggable } from '../../draggable';
import { Sensor } from '../Sensor';
import { getNewXY, XY } from '../../dom';
import { clone } from '../../functor';

/**
 * Senses horizontal position.
 *
 * It should only allow Draggable to move horizontally.
 */
export class HorizontalSensor extends Sensor {
  onMove(draggable: Draggable, moveXY: XY): void {
    moveXY.y = -draggable.getScrollXY().y;
  }

  onScroll(draggable: Draggable, scrollXY: XY): void {
    const moveXY = clone(draggable.getMoveXY());
    draggable.setMoveXY(getNewXY(moveXY.x, -scrollXY.y));
  }
}
