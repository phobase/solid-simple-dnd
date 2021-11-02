import { Draggable } from '../../draggable';
import { getRect, XY } from '../../dom';
import { Detector } from '../../detector';
import { SortableSensor } from './SortableSensor';
import { createStore, SetStoreFunction } from 'solid-js/store';

type Store = {
  sortingRef?: HTMLElement;
};

type SimpleSortableSensorArgs = {
  // Detects sortingRef.
  detector: Detector;
};

/**
 * Senses sortingRef based on detector.
 */
export class SimpleSortableSensor<T> extends SortableSensor<T> {
  private readonly store: Store;
  private readonly setStore: SetStoreFunction<Store>;
  private readonly detector: Detector;

  constructor(args: SimpleSortableSensorArgs) {
    super();

    [this.store, this.setStore] = createStore<Store>({
      //
    });

    this.detector = args.detector;
  }

  onMove(draggable: Draggable, moveXY: XY): void {
    super.onMove(draggable, moveXY);

    const draggableRef = draggable.getRef();
    const refs = this.getRefs().filter(ref => ref !== draggableRef);

    const sortingRefs = this.detector.detect(getRect(draggableRef), refs);

    this.setStore('sortingRef', sortingRefs[0]);
  }

  onEnd(draggable: Draggable): void {
    super.onEnd(draggable);

    this.setStore('sortingRef', undefined);
  }

  getSortingRef(): HTMLElement | undefined {
    return this.store.sortingRef;
  }
}
