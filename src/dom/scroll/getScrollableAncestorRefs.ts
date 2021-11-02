import { WindowElement } from '../WindowElement';
import { isRefScrollable } from './isRefScrollable';

/**
 * Returns scrollable ancestorRefs of a ref.
 *
 * They can be Element or at the top Window.
 *
 * @param ref
 */
export const getScrollableAncestorRefs = (ref: Element): WindowElement[] => {
  const ancestorRefs: WindowElement[] = [];

  // Recursively get scrollable parents
  const getScrollableParentRef = (ref?: Node | null): WindowElement[] => {
    if (!ref) {
      return ancestorRefs;
    }

    if (ref instanceof Document && ref.scrollingElement != null) {
      ancestorRefs.push(window);

      return ancestorRefs;
    }

    if ((ref instanceof HTMLElement || ref instanceof SVGElement) && isRefScrollable(ref)) {
      ancestorRefs.push(ref);
    }

    return getScrollableParentRef(ref.parentNode);
  };

  return getScrollableParentRef(ref.parentNode);
};

export default getScrollableAncestorRefs;
