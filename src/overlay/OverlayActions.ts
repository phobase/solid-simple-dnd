import { createStore, SetStoreFunction } from 'solid-js/store';

type Store = {
  overlayRef?: HTMLElement;
};

/**
 * Manages Overlay.
 *
 * It should be used with Overlay.
 */
export class OverlayActions {
  private readonly store: Store;
  private readonly setStore: SetStoreFunction<Store>;

  constructor() {
    [this.store, this.setStore] = createStore<Store>({});
  }

  /**
   * Sets overlayRef.
   *
   * @param overlayRef
   */
  setOverlayRef(overlayRef: HTMLElement | undefined): void {
    this.setStore('overlayRef', overlayRef);
  }

  /**
   * Returns overlayRef if there is any.
   */
  getOverlayRef(): HTMLElement | undefined {
    return this.store.overlayRef;
  }
}
