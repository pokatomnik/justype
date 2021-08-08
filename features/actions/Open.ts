import type { IActionSubscriber } from './common/IActionSubscriber';
import { Open as DesktopOpen } from './desktop/Open';
import { getTouchPointsNumber } from '../detection';

export class Open implements IActionSubscriber {
  // TODO implement the same for mobile
  private save: IActionSubscriber = new DesktopOpen();

  subscribe(this: this, subscriber: () => void) {
    return this.save.subscribe(subscriber);
  }
}
