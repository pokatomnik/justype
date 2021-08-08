import { isMacKeyboard } from '../../detection/MacKeyboard';
import type { IActionSubscriber } from '../common/IActionSubscriber';

export class GlobalShortcut implements IActionSubscriber {
  private readonly useCmdKey = isMacKeyboard();

  public constructor(private readonly key: string) {}

  public subscribe(this: this, subscriber: () => void) {
    const keyPressHandler = (evt: KeyboardEvent) => {
      const isControlKeyPressed = this.useCmdKey ? evt.metaKey : evt.ctrlKey;

      if (!isControlKeyPressed || evt.key !== this.key) {
        return;
      }
      evt.preventDefault();
      evt.stopPropagation();

      subscriber();
    };

    window.document.addEventListener('keydown', keyPressHandler);

    return () => {
      window.document.removeEventListener('keydown', keyPressHandler);
    };
  }
}
