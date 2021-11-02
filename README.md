# Solid simple dnd

[![main](https://github.com/phobase/solid-simple-dnd/actions/workflows/main.yml/badge.svg)](https://github.com/phobase/solid-simple-dnd/actions/workflows/main.yml)

The library is to provide simple drag and drop functionality for solid-js.

It calculates dragging ref's position and translate based on DOM interaction. Solid-js reactivity is doing the work to keep the DOM updated.

It comprises several small building blocks so that users can construct drag and drop functionality based on what they need.

* `Draggable`
* `DraggableActions`
* `Sensor`
* `Activator`
* `Detector`

Storybook contains examples on how to construct them together.

## Draggable

`Draggable` contains ref that users can drag around.

If you want to add data to `Draggable`, you can add object to it, otherwise you can keep object `undefined`.

To create `Draggable`, you can use `createDraggabble` function.

## DraggableActions

`DraggableActions` manages `Draggable`. `Draggable` should be added to `DraggableActions` as part of `createDraggabble` call.

It should allow start, move, scroll, end, cancel events to happen on dragging `Draggable`.

To manage `Draggable`, `DraggableActions` delegates most of the functionalities to its `Sensor`.

## Sensor

`Sensor` senses start, move, scroll, end, or cancel events on dragging `Draggable`. It should modify the events accordingly before they are applied to dragging `Draggable`.

Most of the time you will need at least a `MouseSensor` and a `ScrollSensor`.

* `MouseSensor` senses mouse events and movement. To start dragging, you can use `MouseSensor#onMouseEvent`. 
* `ScrollSensor` senses the scroll movement of dragging ref's scrollable parents to update dragging ref's position.

`MouseSensor` is a `Activatable` and it requires `Activator` to determine when to start dragging.

## Activator

`Activator` checks when `Activatable` (for example `MouseSensor`) should start.

The simplest way to start dragging is to use `InstantActivator`.

## Detector

`Detector` returns list of `refs` from `otherRefs`, depending on their position and size in relation to `rect`.

It can be used to detect if `Draggable` should be dropped in a `Droppable`.

It can also be used to detect if `Draggable` can be sorted against other `Sortable`.

## Overlay

`Overlay` is a component you can drag around without displacing `Draggable`.

## Droppable and Sortable

Both `Droppable` and `Sortable` are implemented as `Sensor`.

## Animation

Animation is not yet implemented, but it can be added as a `Sensor` so that you can call `requestAnimationFrame` in `Sensor#onStart` or `Sensor#onEnd`.

There is an example `ScaleInSensor.ts`.

## AutoScroll

Auto-scroll is yet implemented, but similarly it can be added as a `Sensor`.

## Development

The library uses `pnpm` as package manager.

* `pnpm lint` to check `tsc` and `eslint`
* `pnpm build` to build using `rollup`
* `pnpm test` to run unit tests using Jest
* `pnpm test:playwright` to run browser tests using Playwright
* `pnpm storybook` to open storybook with all possible examples 

## Note

`WindowSensor` does not work yet.