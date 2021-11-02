import { Sensor } from '../Sensor';
import { Draggable } from '../../draggable';

export class ScaleInSensor extends Sensor {
  onEnd(draggable: Draggable): void {
    let scale = 2;

    const scaleIn = () => {
      scale -= 0.1;
      if (scale < 1) {
        return;
      }
      draggable.getRef().setAttribute('style', `transform: scale(${scale})`);
      window.requestAnimationFrame(scaleIn);
    };

    window.requestAnimationFrame(scaleIn);
  }
}
