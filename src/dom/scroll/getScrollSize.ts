import { WindowElement } from '../WindowElement';
import { getNewSize, Size } from '../wh';

/**
 * Returns scroll size of Element or Window.
 *
 * Scroll size is the size as if there are not scroll bars.
 *
 * @param windowElement
 */
export const getScrollSize = (windowElement: WindowElement): Size => {
  if (windowElement instanceof Window) {
    return getNewSize(
      windowElement.document.documentElement.scrollWidth,
      windowElement.document.documentElement.scrollHeight,
    );
  }

  return getNewSize(windowElement.scrollWidth, windowElement.scrollHeight);
};
