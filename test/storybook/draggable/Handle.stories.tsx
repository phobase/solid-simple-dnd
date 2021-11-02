import { Component, createSignal } from 'solid-js';
import {
  cc,
  createDraggable,
  DraggableActions,
  EscapeSensor,
  getDraggableStyle,
  InstantActivator,
  MouseSensor,
} from '../../../src';
import { storybookCss } from '../index';
import { draggableCss } from './index';
import { draggableId, handleId, targetId } from '../constant';

export default {
  title: 'Draggable/Handle',
};

const Draggable: Component<{
  draggableActions: DraggableActions;
  mouseSensor: MouseSensor;
}> = props => {
  const [ref, setRef] = createSignal<HTMLElement>();

  createDraggable({
    add: draggable => props.draggableActions.addDraggable(draggable),
    remove: ref => props.draggableActions.removeDraggable(ref),
    object: undefined,
    ref,
  });

  return (
    <div
      data-testid={draggableId}
      class={cc([draggableCss.draggable, props.draggableActions.isDraggingRef(ref()) && draggableCss.dragging])}
      ref={setRef}
      style={getDraggableStyle(props.draggableActions, ref())}
    >
      <div
        data-testid={handleId}
        class={cc([draggableCss.grab, draggableCss.handle])}
        onMouseDown={props.mouseSensor.onMouseEvent(ref)}
      />
    </div>
  );
};

const HandleTemplate: Component = () => {
  const escapeSensor = new EscapeSensor();
  const mouseSensor = new MouseSensor({ activators: [new InstantActivator()] });

  const draggableActions = new DraggableActions({
    sensors: [escapeSensor, mouseSensor],
  });

  return (
    <div class={storybookCss.wrapper}>
      <Draggable draggableActions={draggableActions} mouseSensor={mouseSensor} />
      <div data-testid={targetId} class={storybookCss.target} />
    </div>
  );
};

export const Default = HandleTemplate.bind({});

Default.args = {};
