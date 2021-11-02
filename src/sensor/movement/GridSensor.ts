import { Draggable } from '../../draggable';
import { Sensor } from '../Sensor';
import { XY } from '../../dom';

/**
 * Senses grid position.
 *
 * It should only allow position of draggable to be in a grid.
 */
export class GridSensor extends Sensor {
  constructor(private readonly size: number) {
    super();
  }

  onMove(draggable: Draggable, moveXY: XY): void {
    moveXY.x = Math.round(moveXY.x / this.size) * this.size;
    moveXY.y = Math.round(moveXY.y / this.size) * this.size;
  }

  onScroll(draggable: Draggable, scrollXY: XY): void {
    scrollXY.x = Math.round(scrollXY.x / this.size) * this.size;
    scrollXY.y = Math.round(scrollXY.y / this.size) * this.size;
  }
}
