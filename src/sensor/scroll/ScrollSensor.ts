import { Draggable } from '../../draggable';
import { Sensor } from '../Sensor';
import { log } from '../../log';
import { getScrollableAncestorRefs } from '../../dom/scroll/getScrollableAncestorRefs';
import { getAncestorScrollPosition, getZeroXY, minusXY, plusXY, XY } from '../../dom';
import { clone } from '../../functor';

/**
 * Senses Scroll event.
 *
 * It should start listening when drag starts and stop listening when drag ends.
 *
 * It should keep track of delta of the scrolling position of all ancestors so that it can move scrollXY of draggable
 * with the same amount.
 *
 * It should be used along with other activation sensor, such as MouseSensor, so that it can deal with scroll events.
 */
export class ScrollSensor extends Sensor {
  private startXY: XY = getZeroXY();
  private xy: XY = getZeroXY();

  private readonly onActivation = () => {
    const draggable = this.getDraggableActions().getDraggingDraggable();

    if (draggable) {
      const ancestorRefs = getScrollableAncestorRefs(draggable.getRef());
      this.xy = getAncestorScrollPosition(ancestorRefs);

      this.getDraggableActions().scroll();
    }
  };

  onStart(draggable: Draggable): void {
    const ancestorRefs = getScrollableAncestorRefs(draggable.getRef());

    this.startXY = getAncestorScrollPosition(ancestorRefs);
    this.xy = clone(this.startXY);

    log.debug('ScrollSensor#onStart', 'startXY=', this.startXY);

    for (const ancestorRef of ancestorRefs) {
      ancestorRef.addEventListener('scroll', this.onActivation, {
        passive: true,
      });
    }
  }

  onScroll(draggable: Draggable, scrollXY: XY): void {
    plusXY(scrollXY, minusXY(clone(this.xy), this.startXY));
  }

  onEnd(draggable: Draggable): void {
    const ancestorRefs = getScrollableAncestorRefs(draggable.getRef());
    for (const ancestorRef of ancestorRefs) {
      ancestorRef.removeEventListener('scroll', this.onActivation);
    }
  }
}
