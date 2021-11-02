import { Draggable } from '../../draggable';
import { Sensor } from '../Sensor';
import { log } from '../../log';

const isEscape = (event: KeyboardEvent): boolean => event.key === 'Escape';

/**
 * Senses escape key.
 *
 * It should cancel dragging when escape key pressed.
 */
export class EscapeSensor extends Sensor {
  private readonly onKeyUp = (event: KeyboardEvent) => {
    log.debug('EscapeSensor#onKeyUp');

    if (this.getDraggableActions().isDragging() && isEscape(event)) {
      event.preventDefault();

      this.getDraggableActions().cancel();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onStart(draggable: Draggable): void {
    window.document.addEventListener('keyup', this.onKeyUp);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEnd(draggable: Draggable): void {
    window.document.removeEventListener('keyup', this.onKeyUp);
  }
}
