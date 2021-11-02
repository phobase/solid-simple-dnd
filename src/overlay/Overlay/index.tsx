import { Component, createEffect, createSignal, JSX, onCleanup, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { DraggableActions } from '../../draggable';
import { OverlayActions } from '../OverlayActions';

type Props = Pick<JSX.HTMLAttributes<HTMLDivElement>, 'class' | 'style'> & {
  draggableActions: DraggableActions;
  overlayActions: OverlayActions;
};

/**
 * Renders Overlay.
 *
 * It is useful to have Overlay when you do not want to move dragging Draggable as it might displace other components in DOM.
 *
 * It should display children when dragging happens and remove Overlay when dragging ends.
 *
 * It should use a Portal to avoid affecting the current DOM.
 */
export const Overlay: Component<Props> = props => {
  const [ref, setRef] = createSignal<HTMLElement>();

  createEffect(() => {
    props.overlayActions.setOverlayRef(ref());

    onCleanup(() => {
      props.overlayActions.setOverlayRef(undefined);
    });
  });

  return (
    <Portal mount={document.body}>
      <Show when={props.draggableActions.isDragging()}>
        <div ref={setRef} class={props.class} style={props.style}>
          {props.children}
        </div>
      </Show>
    </Portal>
  );
};
