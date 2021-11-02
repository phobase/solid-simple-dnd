import { Component, createSignal } from 'solid-js';
import {
  cc,
  createDraggable,
  createDroppable,
  DraggableActions,
  DroppableSensor,
  EscapeSensor,
  getDraggableStyle,
  InstantActivator,
  IntersectDetector,
  MouseSensor,
  SimpleDroppableSensor,
} from '../../../src';
import { DroppableSvg } from '../component';
import { storybookCss } from '../index';
import { draggableCss } from '../draggable';
import { droppableCss } from './index';

export default {
  title: 'Droppable/Simple',
  argTypes: {},
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
      ref={setRef}
      class={cc([
        props.class,
        draggableCss.draggable,
        draggableCss.grab,
        props.draggableActions.isDraggingRef(ref()) && draggableCss.dragging,
      ])}
      onMouseDown={props.mouseSensor.onMouseEvent(ref)}
      style={getDraggableStyle(props.draggableActions, ref())}
    />
  );
};

const Droppable: Component<{
  droppableSensor: DroppableSensor;
  draggableActions: DraggableActions;
  mouseSensor: MouseSensor;
}> = props => {
  const [ref, setRef] = createSignal<HTMLElement>();

  createDroppable({
    add: droppable => props.droppableSensor.addDroppable(droppable),
    remove: ref => props.droppableSensor.removeDroppable(ref),
    ref,
  });

  return (
    <div
      ref={setRef}
      class={cc([
        droppableCss.droppable,
        props.droppableSensor.isDroppingRef(ref()) && droppableCss.active,
        props.droppableSensor.isDroppedRef(ref()) && droppableCss.dropped,
      ])}
    >
      {props.droppableSensor.isDroppedRef(ref()) && (
        <Draggable draggableActions={props.draggableActions} mouseSensor={props.mouseSensor} />
      )}
      {props.children}
    </div>
  );
};

const Template: Component = () => {
  const escapeSensor = new EscapeSensor();
  const mouseSensor = new MouseSensor({ activators: [new InstantActivator()] });
  const droppableSensor = new SimpleDroppableSensor({ detector: new IntersectDetector() });

  const draggableActions = new DraggableActions({
    sensors: [mouseSensor, escapeSensor, droppableSensor],
  });

  return (
    <div class={storybookCss.wrapper}>
      <div class={droppableCss.droppableWrapper}>
        <Droppable droppableSensor={droppableSensor} draggableActions={draggableActions} mouseSensor={mouseSensor}>
          <DroppableSvg class={droppableCss.droppableSvg} />
        </Droppable>
      </div>
      {!droppableSensor.isDropped() && <Draggable draggableActions={draggableActions} mouseSensor={mouseSensor} />}
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {};
