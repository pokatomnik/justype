import type { IActionSubscriber } from '../common/IActionSubscriber';
import { SwipeEvent } from './SwipeEvent';

export class TouchSave implements IActionSubscriber<void> {
  private readonly swipeEvent = new SwipeEvent({
    thresholdX: 50,
    thresholdY: 50,
  });

  public subscribe(subscriber: () => void) {
    return this.swipeEvent.subscribe((direction) => {
      if (direction === 'right') {
        subscriber();
      }
    });
  }
}
