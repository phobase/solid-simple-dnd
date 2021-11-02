import { render } from 'solid-js/web';
import { log } from "../src/log";

log.setLevel('debug');

export const parameters = {
  layout: 'fullscreen',
};

export const decorators = [
  Story => {
    let element = document.createElement('div');
    render(() => <Story />, element);
    document.getElementById('root').appendChild(element);
    return element;
  },
];
