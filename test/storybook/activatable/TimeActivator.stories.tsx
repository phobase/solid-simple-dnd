import { Component, createSignal } from 'solid-js';
import {
  cc,
  createDraggable,
  DraggableActions,
  EscapeSensor,
  getDraggableStyle,
  MouseSensor,
  ScrollSensor,
  TimeActivator,
} from '../../../src';
import { storybookCss } from '../index';
import { draggableCss } from '../draggable';
import { draggableId, targetId } from '../constant';

export default {
  title: 'Activatable/TimeActivator',
};

const Draggable: Component<{
  class?: string;
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
      class={cc([
        props.class,
        draggableCss.draggable,
        draggableCss.grab,
        props.draggableActions.isDraggingRef(ref()) && draggableCss.dragging,
      ])}
      ref={setRef}
      onMouseDown={props.mouseSensor.onMouseEvent(ref)}
      style={getDraggableStyle(props.draggableActions, ref())}
    />
  );
};

const Template: Component<{ wrapperClass?: string; draggableClass?: string }> = props => {
  const escapeSensor = new EscapeSensor();
  const mouseSensor = new MouseSensor({ activators: [new TimeActivator(1)] });
  const scrollSensor = new ScrollSensor();

  const draggableActions = new DraggableActions({
    sensors: [escapeSensor, mouseSensor, scrollSensor],
  });

  return (
    <div class={cc([props.wrapperClass, storybookCss.wrapper])}>
      <Draggable class={props.draggableClass} draggableActions={draggableActions} mouseSensor={mouseSensor} />
      <div data-testid={targetId} class={storybookCss.target} />
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
  wrapperClass: storybookCss.scrollWrapper,
  draggableClass: draggableCss.center,
};
