import { getNewTranslate, Rect, Translate } from '../../dom';

/**
 * Allows the translate in bounding rect only
 *
 * @param translate
 * @param rect
 * @param boundaryRect
 */
export const restrictBoundary = (translate: Translate, rect: Rect, boundaryRect: Rect): Translate => {
  const newTranslate = getNewTranslate(translate.x, translate.y);

  if (rect.y + translate.y <= boundaryRect.y) {
    newTranslate.y = boundaryRect.y - rect.y;
  } else if (rect.y + rect.height + translate.y >= boundaryRect.y + boundaryRect.height) {
    newTranslate.y = boundaryRect.y + boundaryRect.height - (rect.y + rect.height);
  }

  if (rect.x + translate.x <= boundaryRect.x) {
    newTranslate.x = boundaryRect.x - rect.x;
  } else if (rect.x + rect.width + translate.x >= boundaryRect.x + boundaryRect.width) {
    newTranslate.x = boundaryRect.x + boundaryRect.width - (rect.x + rect.width);
  }

  return newTranslate;
};
