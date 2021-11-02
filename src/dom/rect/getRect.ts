import { Rect } from './Rect';

/**
 * Return Rect for a ref.
 *
 * @param ref
 */
export const getRect = (ref: { getBoundingClientRect: () => DOMRect }): Rect => {
  const clientRect = ref.getBoundingClientRect();

  return {
    width: clientRect.width,
    height: clientRect.height,
    x: clientRect.x,
    y: clientRect.y,
  };
};
