import { getNewPosition, Position } from '../xy';

export const getWindowScroll = (): Position => getNewPosition(window.scrollX, window.scrollY);
