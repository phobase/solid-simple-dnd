/**
 * Returns true if ref is scrollable.
 *
 * A ref is scrollable if its overflow, overflowX, or overflowY contains either auto, scroll, or overlay.
 *
 * @param ref
 */
export const isRefScrollable = (ref: Element): boolean => {
  const computedStyle = window.getComputedStyle(ref);
  const overflowRegex = /(auto|scroll|overlay)/;
  const properties = ['overflow', 'overflowX', 'overflowY'];

  return (
    properties.find(property => {
      const value = computedStyle[property as keyof CSSStyleDeclaration];

      return typeof value === 'string' ? overflowRegex.test(value) : false;
    }) != null
  );
};
