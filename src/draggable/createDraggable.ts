import { createEffect, onCleanup } from 'solid-js';
import { Draggable } from './Draggable';

/**
 * Creates Draggable.
 *
 * It should add Draggable with ref on mount.
 *
 * It should remove Draggable by ref on cleanup.
 *
 * @param args
 */
export const createDraggable = <T = unknown>(args: {
  add: (draggable: Draggable<T>) => void;
  remove: (ref: HTMLElement) => void;
  ref: () => HTMLElement | undefined;
  object: T;
}): void => {
  createEffect(() => {
    const ref_ = args.ref();

    if (ref_) {
      args.add(new Draggable<T>(ref_, args.object));
    }

    onCleanup(() => {
      if (ref_) {
        args.remove(ref_);
      }
    });
  });
};
