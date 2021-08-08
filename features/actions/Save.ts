import type { IActionSubscriber } from './common/IActionSubscriber';
import { GlobalShortcut } from './desktop/GlobalShortcut';
import { getTouchPointsNumber } from '../detection';

export class Save implements IActionSubscriber {
  // TODO implement the same for mobile
  private save: IActionSubscriber = new GlobalShortcut('s');

  subscribe(this: this, subscriber: () => void) {
    return this.save.subscribe(subscriber);
  }
}
