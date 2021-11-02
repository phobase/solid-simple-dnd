import { getZeroXY, Position } from '../dom';
import { createStore, SetStoreFunction } from 'solid-js/store';
import { log } from '../log';
import { Draggable } from './Draggable';
import { Sensor } from '../sensor';

type Store<T> = {
  draggables: Draggable<T>[];
  draggingRef?: HTMLElement;
};

/**
 * Manages Draggables.
 *
 * It should allow start, move, scroll, end, cancel events to happen on dragging Draggable.
 */
export class DraggableActions<T = unknown> {
  private readonly store: Store<T>;
  private readonly setStore: SetStoreFunction<Store<T>>;
  private readonly sensors: Sensor[];

  constructor(args: { sensors: Sensor[] }) {
    [this.store, this.setStore] = createStore<Store<T>>({
      draggables: [],
    });
    this.sensors = args.sensors;

    this.sensors.forEach(sensor => sensor.setDraggableActions(this));
  }

  private find(ref: HTMLElement | undefined): Draggable<T> | undefined {
    if (!ref) {
      return;
    }

    return this.store.draggables.find(draggable => draggable.getRef() === ref);
  }

  /**
   * Starts dragging an ref at a specific position.
   *
   * @param ref
   * @param position
   */
  start(ref: HTMLElement, position: Position): void {
    log.debug('DraggableActions#start', 'ref=', ref, 'position=', position);

    const draggable = this.find(ref);

    if (draggable) {
      this.sensors.forEach(sensor => sensor.onStart(draggable));

      this.setStore('draggingRef', draggable.getRef());
      draggable.start(position);
    }
  }

  /**
   * Moves dragging draggable.
   *
   * Sensors should apply moveXY based on their purpose. For example, MouseSensor changes moveXY based on mouseXY.
   */
  move(): void {
    const draggable = this.find(this.getDraggingRef());

    if (draggable) {
      const moveXY = getZeroXY();

      this.sensors.forEach(sensor => sensor.onMove(draggable, moveXY));
      log.debug('DraggableActions#move', 'moveXY=', moveXY);
      draggable.setMoveXY(moveXY);
    }
  }

  /**
   * Scrolls dragging Draggable.
   *
   * Sensors should apply scrollXY based on their purpose. For example scrolling ancestors adjusts ref scrollXY.
   */
  scroll(): void {
    const draggable = this.find(this.getDraggingRef());

    if (draggable) {
      const scrollXY = getZeroXY();

      this.sensors.forEach(sensor => sensor.onScroll(draggable, scrollXY));

      log.debug('DraggableActions#drag', 'scrollXY=', scrollXY);
      draggable.setScrollXY(scrollXY);
    }
  }

  /**
   * Ends dragging.
   */
  end(): void {
    const draggable = this.find(this.getDraggingRef());

    if (draggable) {
      this.sensors.forEach(sensor => sensor.onEnd(draggable));

      draggable.end();
      log.debug('DraggableActions#end', 't=', draggable.getTranslate(), 'sT=', draggable.getStartTranslate());
    }

    this.setStore('draggingRef', undefined);
  }

  /**
   * Cancels dragging, normally Draggable should be reset to its previous position and translate.
   */
  cancel(): void {
    log.debug('DraggableActions#cancel');

    const draggable = this.find(this.getDraggingRef());
    draggable?.cancel();

    this.setStore('draggingRef', undefined);
  }

  /**
   * Returns ref which is being dragged.
   */
  getDraggingRef(): HTMLElement | undefined {
    return this.store.draggingRef;
  }

  /**
   * Returns Draggable which is being dragged.
   */
  getDraggingDraggable(): Draggable<T> | undefined {
    return this.find(this.getDraggingRef());
  }

  setDraggingRef(ref: HTMLElement | undefined): void {
    this.setStore('draggingRef', ref);
  }

  /**
   * Returns true if ref is currently being dragged.
   *
   * @param ref
   */
  isDraggingRef(ref?: HTMLElement): boolean {
    return this.getDraggingRef() === ref;
  }

  /**
   * Returns true if one of Draggables is being dragged.
   */
  isDragging(): boolean {
    return this.getDraggingRef() !== undefined;
  }

  /**
   * Adds draggable, which contains ref.
   * @param draggable
   */
  addDraggable(draggable: Draggable<T>): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.setStore('draggables', draggables => [...draggables, draggable]);
  }

  /**
   * Returns Draggable based on ref.
   *
   * @param ref
   */
  getDraggable(ref?: HTMLElement): Draggable<T> | undefined {
    return this.find(ref);
  }

  /**
   * Removes Draggable based on ref.
   *
   * @param ref
   */
  removeDraggable(ref: HTMLElement): void {
    this.setStore('draggables', draggables => draggables.filter((draggable: Draggable) => draggable.getRef() !== ref));
  }
}
