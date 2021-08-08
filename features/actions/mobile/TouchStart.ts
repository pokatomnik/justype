import type { IActionSubscriber } from '../common/IActionSubscriber';
import { subscribe } from './TouchEvent';

export class TouchStart implements IActionSubscriber<TouchEvent> {
  public subscribe(subscriber: (evt: TouchEvent) => void) {
    return subscribe('touchstart', subscriber);
  }
}
