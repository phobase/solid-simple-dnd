/**
 * Sensor (such as MouseSensor or TouchSensor) can be Activatable.
 */
export interface Activatable {
  /**
   * Activates, normally it means start DraggableActions
   */
  activate(): void;

  /**
   * Deactivates, normally it means stop all monitoring.
   */
  deactivate(): void;

  /**
   * Returns true if Activatable is in activating phase, which is when it regularly check activator for activation before dragging.
   */
  isActivating(): boolean;
}
