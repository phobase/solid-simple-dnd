import { createEffect, onCleanup } from 'solid-js';
import { Droppable } from './Droppable';

/**
 * Creates Droppable.
 *
 * This adds Droppable with ref to droppableActions.
 *
 * @param args
 */
export const createDroppable = (args: {
  add: (droppable: Droppable) => void;
  remove: (ref: HTMLElement) => void;
  ref: () => HTMLElement | undefined;
}): void => {
  createEffect(() => {
    const ref_ = args.ref();

    if (ref_) {
      args.add(new Droppable(ref_));
    }

    onCleanup(() => {
      if (ref_) {
        args.remove(ref_);
      }
    });
  });
};
