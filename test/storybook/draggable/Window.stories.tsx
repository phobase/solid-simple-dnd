import { Component, createSignal } from 'solid-js';
import {
  cc,
  createDraggable,
  DraggableActions,
  EscapeSensor,
  getDraggableStyle,
  InstantActivator,
  MouseSensor,
  ScrollSensor,
  WindowSensor,
} from '../../../src';
import { storybookCss } from '../index';
import { draggableCss } from './index';
import { draggableId } from '../constant';

export default {
  title: 'Draggable/Window',
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
      onMouseDown={props.mouseSensor.onMouseEvent(ref)}
      style={getDraggableStyle(props.draggableActions, ref())}
    />
  );
};

const Template: Component<{ wrapperClass?: string }> = props => {
  const windowSensor = new WindowSensor();
  const escapeSensor = new EscapeSensor();
  const mouseSensor = new MouseSensor({ activators: [new InstantActivator()] });
  const scrollSensor = new ScrollSensor();

  const draggableActions = new DraggableActions({
    sensors: [mouseSensor, scrollSensor, windowSensor, escapeSensor],
  });

  return (
    <div class={cc([props.wrapperClass, storybookCss.wrapper])}>
      <Draggable draggableActions={draggableActions} mouseSensor={mouseSensor} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {};

export const Scroll = Template.bind({});

Scroll.args = {
  wrapperClass: storybookCss.scrollWrapper,
};

export const Center = Template.bind({});

Center.args = {
  draggableClass: draggableCss.center,
};
