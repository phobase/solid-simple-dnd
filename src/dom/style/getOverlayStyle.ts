import { JSX } from 'solid-js';
import { DraggableActions } from '../../draggable';
import { getRect } from '../rect';
import { px } from './px';

/**
 * Returns style for overlay based on dragging draggable and its position.
 *
 * It should give overlay fixed position with dragging draggable width and height.
 *
 * @param draggableActions
 */
export const getOverlayStyle = (draggableActions: DraggableActions): JSX.CSSProperties => {
  const draggable = draggableActions.getDraggingDraggable();
  const draggingRef = draggableActions.getDraggingRef();

  if (!draggable || !draggingRef) {
    return {};
  }

  const rect = getRect(draggingRef);

  const style: JSX.CSSProperties = {
    position: 'fixed',
    left: px(draggable.getPosition().x),
    top: px(draggable.getPosition().y),
    height: px(rect.height),
    width: px(rect.width),
  };

  return style;
};
