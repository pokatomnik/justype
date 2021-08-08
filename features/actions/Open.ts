import type { IActionSubscriber } from './common/IActionSubscriber';
import { GlobalShortcut } from './desktop/GlobalShortcut';
import { TouchOpen } from './mobile/TouchOpen';
import { getTouchPointsNumber } from '../detection';

export class Open implements IActionSubscriber<void> {
  private save: IActionSubscriber<void> =
    getTouchPointsNumber() > 0 ? new TouchOpen() : new GlobalShortcut('o');

  public subscribe(subscriber: () => void) {
    return this.save.subscribe(subscriber);
  }
}
