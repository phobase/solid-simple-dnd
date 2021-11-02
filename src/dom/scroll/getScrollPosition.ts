import { getNewPosition, Position } from '../xy';
import { WindowElement } from '../WindowElement';

/**
 * Returns scroll position of Element or Window.
 *
 * Scroll position is the movement of the scroll from we top left.
 *
 * @param windowElement
 */
export const getScrollPosition = (windowElement: WindowElement): Position => {
  if (windowElement instanceof Window) {
    return getNewPosition(windowElement.scrollX, windowElement.scrollY);
  }

  return getNewPosition(windowElement.scrollLeft, windowElement.scrollTop);
};
