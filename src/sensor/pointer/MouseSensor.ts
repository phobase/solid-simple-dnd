import { Draggable } from '../../draggable';
import { getMouseXY, getNewPosition, getRect, getZeroXY, minusXY, plusXY, XY } from '../../dom';
import { log } from '../../log';
import { Sensor } from '../Sensor';
import { clone } from '../../functor';
import { Activatable, Activator } from '../../activatable';
import { PointerSensor } from './PointerSensor';

/**
 * Senses mouse events (down, up, move) and changes DraggableActions.
 */
export class MouseSensor extends Sensor implements PointerSensor, Activatable {
  private startXY: XY;
  private xy: XY;
  private activatingRef: HTMLElement | undefined;
  private readonly activators: Activator[];

  constructor(args: { activators: Activator[] }) {
    super();
    this.startXY = getZeroXY();
    this.xy = getZeroXY();
    this.activators = args.activators;

    this.activators.forEach(activator => activator.setActivatable(this));
  }

  private readonly onMouseMove = (event: MouseEvent) => {
    log.debug('MouseSensor#onMouseMove');

    this.xy = getMouseXY(event);

    if (this.isActivating()) {
      this.activators.forEach(activator => activator.checkActivationOnMove(this.xy));
    } else {
      if (this.getDraggableActions().isDragging()) {
        event.preventDefault();

        this.getDraggableActions().move();
      }
    }
  };

  private readonly onMouseUp = (event: MouseEvent) => {
    log.debug('MouseSensor#onMouseUp');

    if (this.getDraggableActions().isDragging()) {
      // Prevent default as we are using this event
      event.preventDefault();

      this.getDraggableActions().end();
    }
    this.deactivate();
  };

  private readonly cancel = (event: Event) => {
    event.preventDefault();

    this.getDraggableActions().cancel();
    this.deactivate();
  };

  getXY(): XY {
    return this.xy;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEnd(draggable: Draggable): void {
    this.removeListeners();
  }

  onMove(draggable: Draggable, moveXY: XY): void {
    // Clone to avoid mutation of this.xy
    plusXY(moveXY, minusXY(clone(this.xy), this.startXY));
  }

  /**
   * Returns function to trigger Activator.
   */
  onMouseEvent(ref: () => HTMLElement | undefined): (event: MouseEvent) => void {
    return (event: MouseEvent) => {
      this.activatingRef = ref();

      if (this.activatingRef) {
        this.addListeners();

        this.startXY = getMouseXY(event);

        this.activators.forEach(activator => activator.checkActivationOnStart(this.startXY));
      }
    };
  }

  /**
   * Activate dragging for the this.activatingRef.
   *
   * This is normally called by Activator.
   */
  activate(): void {
    if (this.activatingRef) {
      const rect = getRect(this.activatingRef);
      const position = getNewPosition(rect.x, rect.y);

      this.getDraggableActions().start(this.activatingRef, position);
    }

    this.activatingRef = undefined;
  }

  /**
   * Deactivates dragging.
   *
   * If dragging hasn't started yet, it should remove activatingRef and listeners
   *
   * If dragging has started, it should end dragging.
   */
  deactivate(): void {
    this.activatingRef = undefined;
    this.removeListeners();

    if (this.getDraggableActions().isDragging()) {
      this.getDraggableActions().end();
    }
  }

  isActivating(): boolean {
    return this.activatingRef !== undefined;
  }

  private addListeners() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    // Need to opt out of dragging if the user is a force press
    // Only for safari which has decided to introduce its own custom way of doing things
    // https://developer.apple.com/library/content/documentation/AppleApplications/Conceptual/SafariJSProgTopics/RespondingtoForceTouchEventsfromJavaScript.html
    document.addEventListener('webkitmouseforcedown', this.cancel);
    document.addEventListener('resize', this.cancel);
  }

  private removeListeners(): void {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('webkitmouseforcedown', this.cancel);
    document.removeEventListener('resize', this.cancel);
  }
}
