import type { IActionSubscriber } from '../common/IActionSubscriber';
import { subscribe } from './TouchEvent';

export class TouchEnd implements IActionSubscriber<TouchEvent> {
  public subscribe(subscriber: (evt: TouchEvent) => void) {
    return subscribe('touchend', subscriber);
  }
}
