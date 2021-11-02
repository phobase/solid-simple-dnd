import { JSX } from 'solid-js';
import { DraggableActions } from '../../draggable';
import { px } from './px';

/**
 * Returns translate style for draggable.
 *
 * It should be used on draggable when overlay is being used, as we only want to update the position of draggable after
 * dragging.
 *
 * @param draggableActions
 * @param ref
 */
export const getTranslateStyle = (
  draggableActions: DraggableActions,
  ref: HTMLElement | undefined,
): JSX.CSSProperties => {
  const draggable = draggableActions.getDraggable(ref);

  if (!draggable) {
    return {};
  }

  if (draggableActions.isDraggingRef(ref)) {
    return { transform: `translate(${px(draggable.getStartTranslate().x)}, ${px(draggable.getStartTranslate().y)})` };
  } else {
    return { transform: `translate(${px(draggable.getTranslate().x)}, ${px(draggable.getTranslate().y)})` };
  }
};
