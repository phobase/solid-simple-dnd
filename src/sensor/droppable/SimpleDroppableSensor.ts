import { Draggable } from '../../draggable';
import { Detector } from '../../detector';
import { getRect, XY } from '../../dom';
import { createStore, SetStoreFunction } from 'solid-js/store';
import { DroppableSensor } from './DroppableSensor';

type Store = {
  droppingRef?: HTMLElement;
  droppedRef?: HTMLElement;
};

export type SimpleDroppableSensorArgs = {
  /**
   * Detects droppingRef.
   */
  detector: Detector;
};

/**
 * Sense droppingRef and droppedRef from draggable changes.
 */
export class SimpleDroppableSensor extends DroppableSensor {
  private readonly detector: Detector;
  private readonly store: Store;
  private readonly setStore: SetStoreFunction<Store>;

  constructor(args: SimpleDroppableSensorArgs) {
    super();
    this.detector = args.detector;
    [this.store, this.setStore] = createStore<Store>({});
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onMove(draggable: Draggable, moveXY: XY): void {
    const droppingRefs = this.detector.detect(getRect(draggable.getRef()), this.getRefs());

    this.setDroppingRef(droppingRefs[0]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEnd(draggable: Draggable): void {
    const droppingRef = this.getDroppingRef();

    // Make droppedRef uniformly undefined, rather than null or undefined
    this.setDroppedRef(droppingRef ? droppingRef : undefined);
    this.setDroppingRef(undefined);
  }

  /**
   * Returns ref which is being dropped.
   */
  getDroppingRef(): HTMLElement | undefined {
    return this.store.droppingRef;
  }

  /**
   * Sets ref which is being dropped.
   *
   * @param ref
   */
  setDroppingRef(ref?: HTMLElement): void {
    this.setStore('droppingRef', ref);
  }

  /**
   * Returns ref which has been dropped.
   */
  getDroppedRef(): HTMLElement | undefined {
    return this.store.droppedRef;
  }

  /**
   * Sets ref which has been dropped.
   *
   * @param ref
   */
  setDroppedRef(ref?: HTMLElement): void {
    this.setStore('droppedRef', ref);
  }
}
