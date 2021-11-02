import { getZeroPosition, plusXY, Position } from '../xy';
import { getScrollPosition } from './getScrollPosition';
import { WindowElement } from '../WindowElement';

/**
 * Returns total scroll position of all the ancestorRefs.
 *
 * @param ancestorRefs
 */
export const getAncestorScrollPosition = (ancestorRefs: WindowElement[]): Position => {
  return ancestorRefs.reduce<Position>((position, ref) => {
    return plusXY(position, getScrollPosition(ref));
  }, getZeroPosition());
};
