import type { IActionSubscriber } from './common/IActionSubscriber';
import { GlobalShortcut } from './desktop/GlobalShortcut';
import { getTouchPointsNumber } from '../detection';
import { TouchSave } from './mobile/TouchSave';

export class Save implements IActionSubscriber<void> {
  private save: IActionSubscriber<void> =
    getTouchPointsNumber() > 0 ? new TouchSave() : new GlobalShortcut('s');

  public subscribe(subscriber: () => void) {
    return this.save.subscribe(subscriber);
  }
}
