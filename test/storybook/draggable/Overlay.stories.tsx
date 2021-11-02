import { Component, createSignal } from 'solid-js';
import {
  cc,
  createDraggable,
  DraggableActions,
  EscapeSensor,
  getOverlayStyle,
  getTranslateStyle,
  InstantActivator,
  MouseSensor,
  OverlayActions,
  ScrollSensor,
} from '../../../src';
import { storybookCss } from '../index';
import { draggableCss } from './index';
import { draggableId, overlayId, targetId } from '../constant';
import { Overlay } from '../../../src';

export default {
  title: 'Draggable/Overlay',
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
      class={cc([draggableCss.draggable, props.draggableActions.isDraggingRef(ref()) && storybookCss.dragging])}
      ref={setRef}
      onMouseDown={props.mouseSensor.onMouseEvent(ref)}
      style={getTranslateStyle(props.draggableActions, ref())}
    />
  );
};

const Template: Component<{ wrapperClass?: string }> = props => {
  const mouseSensor = new MouseSensor({ activators: [new InstantActivator()] });
  const escapeSensor = new EscapeSensor();
  const scrollSenor = new ScrollSensor();

  const overlayActions = new OverlayActions();
  const draggableActions = new DraggableActions({
    sensors: [scrollSenor, mouseSensor, escapeSensor],
  });

  return (
    <div class={cc([storybookCss.wrapper, props.wrapperClass])}>
      <Draggable draggableActions={draggableActions} mouseSensor={mouseSensor} />
      <Overlay
        overlayActions={overlayActions}
        draggableActions={draggableActions}
        style={getOverlayStyle(draggableActions)}
      >
        <div data-testid={overlayId} class={cc([draggableCss.draggable])} />
      </Overlay>
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

// export const Center = Template.bind({});
//
// Center.args = {
//   draggableClass: draggableCss.center,
// };
