import { Component, createSignal, For } from 'solid-js';
import { storybookCss } from '../index';
import {
  cc,
  CenterDetector,
  createDraggable,
  DraggableActions,
  EscapeSensor,
  getDraggableStyle,
  InstantActivator,
  MouseSensor,
  SimpleSortableSensor,
  Sortable,
} from '../../../src';
import { sortableCss } from './index';

export default {
  title: 'Sortable/Vertical',
};

const Draggable: Component<{
  draggableActions: DraggableActions;
  mouseSensor: MouseSensor;
  sortableSensor: SimpleSortableSensor<number>;
  item: number;
}> = props => {
  const [ref, setRef] = createSignal<HTMLElement>();

  createDraggable({
    add: draggable => {
      props.draggableActions.addDraggable(draggable);
      props.sortableSensor.addSortable(new Sortable<number>(draggable.getRef(), props.item));
    },
    remove: ref => {
      props.draggableActions.removeDraggable(ref);
      props.sortableSensor.removeSortable(ref);
    },
    object: undefined,
    ref,
  });

  return (
    <div
      class={cc([
        sortableCss.draggable,
        props.draggableActions.isDraggingRef(ref()) && sortableCss.dragging,
        props.sortableSensor.isSortingRef(ref()) && sortableCss.isSorting,
      ])}
      ref={setRef}
      onMouseDown={props.mouseSensor.onMouseEvent(ref)}
      style={getDraggableStyle(props.draggableActions, ref())}
    >
      {props.item}
    </div>
  );
};

const Template: Component = () => {
  const items = [...Array(5).keys()];

  const escapeSensor = new EscapeSensor();
  const mouseSensor = new MouseSensor({ activators: [new InstantActivator()] });
  const sortableSensor = new SimpleSortableSensor<number>({ detector: new CenterDetector() });

  const draggableActions = new DraggableActions({
    sensors: [escapeSensor, mouseSensor, sortableSensor],
  });

  return (
    <div class={storybookCss.wrapper}>
      <div class={sortableCss.sortableWrapper}>
        <For each={items}>
          {item => (
            <Draggable
              draggableActions={draggableActions}
              mouseSensor={mouseSensor}
              sortableSensor={sortableSensor}
              item={item}
            />
          )}
        </For>
      </div>
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {};
