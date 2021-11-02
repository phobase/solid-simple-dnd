/**
 * Sortable contains ref and item.
 *
 * We use ref to determine where to sort sortable.
 *
 * We use object to actually sort sortable.
 */
export class Sortable<T> {
  constructor(protected readonly ref: HTMLElement, protected readonly object: T) {}

  /**
   * Returns ref.
   */
  getRef(): HTMLElement {
    return this.ref;
  }

  /**
   * Returns object.
   *
   * During sorting, object is necessary to know the order of sortable.
   */
  getObject(): T {
    return this.object;
  }
}
