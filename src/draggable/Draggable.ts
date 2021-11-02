import { getZeroPosition, getZeroTranslate, getZeroXY, plusXY, Position, Translate, XY } from '../dom';
import { createStore, SetStoreFunction } from 'solid-js/store';
import { clone } from '../functor';

/**
 * Solid store is necessary so that it keeps updating DOM based on position and translate.
 */
type Store = {
  moveXY: XY;
  scrollXY: XY;
  startPosition: Position;
  startTranslate: Translate;
  pointerXY?: XY;
};

/**
 * Contains ref that users can drag around.
 *
 * It should have position and translate of the ref.
 * * Position is the (x, y) of the ref relative to window (0, 0). It is useful to place ref during dragging, so that we
 * don't have to rely on scrolling of ref ancestors.
 * * Translate is the (x, y) of the ref relative to its original place. It is useful to place ref after dragging.
 */
export class Draggable<T = unknown | undefined> {
  private readonly ref: HTMLElement;
  private readonly object: T;
  private readonly store: Store;
  private readonly setStore: SetStoreFunction<Store>;

  constructor(ref: HTMLElement, object: T) {
    this.ref = ref;
    this.object = object;

    [this.store, this.setStore] = createStore<Store>({
      startPosition: getZeroPosition(),
      startTranslate: getZeroTranslate(),
      moveXY: getZeroXY(),
      scrollXY: getZeroXY(),
    });
  }

  getObject(): T {
    return this.object;
  }

  /**
   * Returns ref, which can be dragged.
   */
  getRef(): HTMLElement {
    return this.ref;
  }

  /**
   * Start dragging at position relative ot the window (0, 0)
   *
   * @param position
   */
  start(position: Position): void {
    this.setStore('startPosition', position);
    this.setStore('startTranslate', clone(this.getTranslate()));
    this.setStore('moveXY', getZeroXY());
    this.setStore('scrollXY', getZeroXY());
  }

  /**
   * End dragging, do nothing as all updates happen during start and drag.
   */
  end(): void {
    //
  }

  /**
   * Cancel dragging, move back to start position and translate
   */
  cancel(): void {
    this.setStore('moveXY', getZeroXY());
    this.setStore('scrollXY', getZeroXY());
  }

  setMoveXY(moveXY: XY): void {
    this.setStore('moveXY', moveXY);
  }

  /**
   * Returns moveXY.
   */
  getMoveXY(): XY {
    return this.store.moveXY;
  }

  /**
   * Returns scrollXY.
   */
  getScrollXY(): XY {
    return this.store.scrollXY;
  }

  setScrollXY(scrollXY: XY): void {
    this.setStore('scrollXY', scrollXY);
  }

  /**
   * Returns draggable translate from its original location.
   */
  getTranslate(): Translate {
    return plusXY(plusXY(clone(this.getStartTranslate()), this.getMoveXY()), this.getScrollXY());
  }

  /**
   * Returns draggable position relative to window (0, 0).
   */
  getPosition(): Position {
    return plusXY(clone(this.getStartPosition()), this.getMoveXY());
  }

  /**
   * Returns draggable start position, which is the position when Draggable start dragging.
   */
  getStartPosition(): Position {
    return this.store.startPosition;
  }

  /**
   * Returns draggable startTranslate, which is the translate when draggable starts dragging.
   */
  getStartTranslate(): Translate {
    return this.store.startTranslate;
  }
}
