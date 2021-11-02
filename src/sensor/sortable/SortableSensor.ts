import { Sortable } from '../../sortable';
import { Sensor } from '../Sensor';
import { createStore, SetStoreFunction } from 'solid-js/store';

export type Store<T> = {
  sortables: Sortable<T>[];
};

/**
 * Senses sortingRef from draggable changes.
 */
export abstract class SortableSensor<T = unknown> extends Sensor {
  private readonly store_: Store<T>;
  private readonly setStore_: SetStoreFunction<Store<T>>;

  protected constructor() {
    super();

    [this.store_, this.setStore_] = createStore<Store<T>>({
      sortables: [],
    });
  }

  /**
   * Returns all refs managed by sensor.
   */
  getRefs(): HTMLElement[] {
    return this.store_.sortables.map(sortable => sortable.getRef());
  }

  /**
   * Adds sortable.
   * @param sortable
   */
  addSortable(sortable: Sortable<T>): void {
    this.setStore_('sortables', sortables => [...sortables, sortable]);
  }

  /**
   * Returns sortable by ref.
   * @param ref
   */
  getSortable(ref: HTMLElement): Sortable<T> | undefined {
    return this.store_.sortables.find(sortable => sortable.getRef() === ref);
  }

  /**
   * Removes sortable by ref.
   * @param ref
   */
  removeSortable(ref: HTMLElement): void {
    this.setStore_('sortables', sortables => sortables.filter((sortable: Sortable<T>) => sortable.getRef() !== ref));
  }

  /**
   * Returns sorting sortable, which is the one that draggable is activating it.
   */
  getSortingSortable(): Sortable<T> | undefined {
    return this.store_.sortables.find(sortable => sortable.getRef() === this.getSortingRef());
  }

  /**
   * Returns sorting ref, which is the one that draggable is activating it.
   */
  abstract getSortingRef(): HTMLElement | undefined;

  /**
   * Returns true if ref is sensor sorting ref.
   */
  isSortingRef(ref: HTMLElement | undefined): boolean {
    if (!ref) {
      return false;
    }

    return this.getSortingRef() === ref;
  }

  /**
   * Returns sorting sortable if ref is sorting ref.
   * @param ref
   */
  getSortingSortableByRef(ref: HTMLElement | undefined): Sortable<T> | undefined {
    if (!this.isSortingRef(ref)) {
      return undefined;
    }

    return this.getSortingSortable();
  }
}
