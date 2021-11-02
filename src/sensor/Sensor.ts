import { Draggable, DraggableActions } from '../draggable';
import { XY } from '../dom';

/**
 * Applies changes during life cycle of dragging Draggable, which includes start, move, scroll, end events.
 *
 * Sensor requires draggableActions so that it can control the whole dragging life cycle.
 */
export abstract class Sensor<T = unknown> {
  private draggableActions: DraggableActions<T> | undefined;

  getDraggableActions(): DraggableActions<T> {
    if (!this.draggableActions) {
      throw Error('Sensor requires draggableActions to be defined');
    }

    return this.draggableActions;
  }

  setDraggableActions(draggableActions: DraggableActions<T>): void {
    this.draggableActions = draggableActions;
  }

  /**
   * Senses before Draggable starts.
   *
   * @param draggable
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onStart(draggable: Draggable<T>): void {
    // No-op so that children do not need to implement this un-necessarily
  }

  /**
   * Senses before Draggable is being moved.
   *
   * We should change moveXY,
   *
   * @param draggable
   * @param moveXY - XY of Draggable movement
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onMove(draggable: Draggable<T>, moveXY: XY): void {
    // No-op so that children do not need to implement this un-necessarily
  }

  /**
   * Senses before Draggable is being scrolled.
   *
   * @param draggable
   * @param scrollXY - XY of Draggable scroll
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onScroll(draggable: Draggable<T>, scrollXY: XY): void {
    // No-op so that children do not need to implement this un-necessarily
  }

  /**
   * Senses before Draggable ends.
   *
   * @param draggable
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEnd(draggable: Draggable<T>): void {
    // No-op so that children do not need to implement this un-necessarily
  }
}
