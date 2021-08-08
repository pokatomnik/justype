import type { IActionSubscriber } from './common/IActionSubscriber';
import { Save as DesktopSave } from './desktop/Save';
import { getTouchPointsNumber } from '../detection';

export class Save implements IActionSubscriber {
  // TODO implement the same for mobile
  private save: IActionSubscriber = new DesktopSave();

  subscribe(this: this, subscriber: () => void) {
    return this.save.subscribe(subscriber);
  }
}
