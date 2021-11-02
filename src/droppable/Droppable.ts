/**
 * Contains ref into which we can drop Draggable.
 */
export class Droppable {
  constructor(private readonly ref: HTMLElement) {
    //
  }

  /**
   * Ref that can be dropped into.
   */
  getRef(): HTMLElement {
    return this.ref;
  }
}
