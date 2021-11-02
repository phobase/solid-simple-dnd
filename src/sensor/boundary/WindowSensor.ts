import { Draggable } from '../../draggable';
import { Sensor } from '../Sensor';
import { getRect, getWindowRect, minusXY, XY } from '../../dom';
import { restrictBoundary } from './restrictBoundary';
import { log } from '../../log';

export class WindowSensor extends Sensor {
  onMove(draggable: Draggable, moveXY: XY): void {
    const rect = getRect(draggable.getRef());
    const windowRect = getWindowRect();

    // Translate is meant to be from startPosition
    rect.x = draggable.getStartPosition().x;
    rect.y = draggable.getStartPosition().y;

    log.debug('WindowSensor#onDrag', 'r=', rect, 'wr=', windowRect);

    const newXY = restrictBoundary(moveXY, rect, windowRect);
    minusXY(moveXY, newXY);
  }
}
