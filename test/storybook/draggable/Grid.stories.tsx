import { Component, createSignal } from 'solid-js';
import {
  cc,
  createDraggable,
  DraggableActions,
  EscapeSensor,
  getDraggableStyle,
  GridSensor,
  InstantActivator,
  MouseSensor,
  ScrollSensor,
} from '../../../src';
import { storybookCss } from '../index';
import { draggableCss } from './index';
import { draggableId, gridSize, targetId } from '../constant';

export default {
  title: 'Draggable/Grid',
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
  const gridSensor = new GridSensor(gridSize);
  const escapeSensor = new EscapeSensor();
  const mouseSensor = new MouseSensor({ activators: [new InstantActivator()] });
  const scrollSensor = new ScrollSensor();

  const draggableActions = new DraggableActions({
    sensors: [scrollSensor, mouseSensor, gridSensor, escapeSensor],
  });

  return (
    <div class={cc([props.wrapperClass, storybookCss.wrapper, storybookCss.grid])}>
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
