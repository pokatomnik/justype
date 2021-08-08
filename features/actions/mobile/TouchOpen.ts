import type { IActionSubscriber } from '../common/IActionSubscriber';
import { SwipeEvent } from './SwipeEvent';

export class TouchOpen implements IActionSubscriber<void> {
  private readonly swipeEvent = new SwipeEvent({
    thresholdX: 50,
    thresholdY: 50,
  });

  public subscribe(subscriber: () => void) {
    return this.swipeEvent.subscribe((direction) => {
      if (direction === 'left') {
        subscriber();
      }
    });
  }
}
