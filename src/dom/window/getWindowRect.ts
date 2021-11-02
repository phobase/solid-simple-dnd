import { getRect, Rect } from '../rect';

export const getWindowRect = (): Rect => getRect(window.document.body);
