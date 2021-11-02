import { Component, createSignal } from 'solid-js';
import {
  cc,
  createDraggable,
  DraggableActions,
  EscapeSensor,
  getDraggableStyle,
  HorizontalSensor,
  InstantActivator,
  MouseSensor,
  ScrollSensor,
} from '../../../src';
import { storybookCss } from '../index';
import { draggableCss } from './index';
import { draggableId, targetId } from '../constant';

export default {
  title: 'Draggable/Horizontal',
};

const Draggable: Component<{
  draggableActions: DraggableActions;
  mouseSensor: MouseSensor;
  class?: string;
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
        props.draggableActions.isDraggingRef(ref()) && draggableCss.dragging,
      ])}
      ref={setRef}
      onMouseDown={props.mouseSensor.onMouseEvent(ref)}
      style={getDraggableStyle(props.draggableActions, ref())}
    />
  );
};

const Template: Component<{ wrapperClass?: string; draggableClass?: string }> = props => {
  const mouseSensor = new MouseSensor({ activators: [new InstantActivator()] });
  const scrollSensor = new ScrollSensor();
  const horizontalSensor = new HorizontalSensor();
  const escapeSensor = new EscapeSensor();

  const draggableActions = new DraggableActions({
    sensors: [mouseSensor, scrollSensor, horizontalSensor, escapeSensor],
  });

  return (
    <div class={cc([storybookCss.wrapper, props.wrapperClass])}>
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
  draggableClass: draggableCss.center,
};
