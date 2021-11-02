import { WindowElement } from '../WindowElement';
import { getScrollSize } from './getScrollSize';
import { getZeroSize, plusWH, Size } from '../wh';

/**
 * Returns total scroll size of all the ancestorRefs.
 *
 * @param ancestorRefs
 */
export const getAncestorScrollSize = (ancestorRefs: WindowElement[]): Size => {
  return ancestorRefs.reduce<Size>((size, ref) => {
    return plusWH(size, getScrollSize(ref));
  }, getZeroSize());
};
