import { JSX } from 'solid-js';
import { DraggableActions } from '../../draggable';
import { px } from './px';

/**
 * Returns style for draggable.
 *
 * It should use fixed position when draggable is dragging, so that draggable follow mouse automatically even when
 * scrolling happens.
 *
 * It should use translate if draggable is not dragging, so that draggable can be placed anywhere in the whole document.
 *
 * @param draggableActions
 * @param ref
 */
export const getDraggableStyle = (
  draggableActions: DraggableActions,
  ref: HTMLElement | undefined,
): JSX.CSSProperties => {
  const draggable = draggableActions.getDraggable(ref);

  if (!draggable) {
    return {};
  }

  if (draggableActions.isDraggingRef(ref)) {
    return {
      position: 'fixed',
      left: px(draggable.getPosition().x),
      top: px(draggable.getPosition().y),
    };
  } else {
    return { transform: `translate(${px(draggable.getTranslate().x)}, ${px(draggable.getTranslate().y)})` };
  }
};
