import { Sensor } from '../Sensor';
import { Droppable } from '../../droppable';
import { createStore, SetStoreFunction } from 'solid-js/store';

type Store = {
  droppables: Droppable[];
};

/**
 * Senses droppingRef and droppedRef from draggable changes.
 */
export abstract class DroppableSensor extends Sensor {
  private readonly store_: Store;
  private readonly setStore_: SetStoreFunction<Store>;

  protected constructor() {
    super();
    [this.store_, this.setStore_] = createStore<Store>({
      droppables: [],
    });
  }

  /**
   * Returns all refs managed by sensor.
   */
  getRefs(): HTMLElement[] {
    return this.store_.droppables.map(droppable => droppable.getRef());
  }

  /**
   * Returns true if there is ref which has been dropped.
   */
  isDropped(): boolean {
    return this.getDroppedRef() !== undefined;
  }

  /**
   * Returns true if ref has been dropped into.
   *
   * @param ref
   */
  isDroppedRef(ref?: HTMLElement): boolean {
    return this.getDroppedRef() === ref;
  }

  /**
   * Returns droppable which is being dropped.
   */
  getDroppingDroppable(): Droppable | undefined {
    return this.getDroppable(this.getDroppingRef());
  }

  /**
   * Returns true if ref is currently being dropped.
   *
   * @param ref
   */
  isDroppingRef(ref?: HTMLElement): boolean {
    return this.getDroppingRef() === ref;
  }

  /**
   * Returns true if one of the droppables is being dropped.
   */
  isDropping(): boolean {
    return this.getDroppingRef() !== undefined;
  }

  /**
   * Add droppable, which contains ref.
   *
   * @param droppable
   */
  addDroppable(droppable: Droppable): void {
    this.setStore_('droppables', droppables => [...droppables, droppable]);
  }

  /**
   * Returns droppable based on ref.
   *
   * @param ref
   */
  getDroppable(ref?: HTMLElement): Droppable | undefined {
    return this.store_.droppables.find(droppable => droppable.getRef() === ref);
  }

  /**
   * Removes Droppable based on ref.
   *
   * @param ref
   */
  removeDroppable(ref: HTMLElement): void {
    this.setStore_('droppables', droppables => droppables.filter((droppable: Droppable) => droppable.getRef() !== ref));
  }

  /**
   * Returns ref which is being dropped.
   */
  abstract getDroppingRef(): HTMLElement | undefined;

  /**
   * Sets ref which is being dropped.
   *
   * @param ref
   */
  abstract setDroppingRef(ref?: HTMLElement): void;

  /**
   * Returns ref which has been dropped.
   */
  abstract getDroppedRef(): HTMLElement | undefined;

  /**
   * Sets ref which has been dropped.
   *
   * @param ref
   */
  abstract setDroppedRef(ref?: HTMLElement): void;
}
