import { isMacKeyboard } from '../../detection/MacKeyboard';
import type { IActionSubscriber } from './IActionSubscriber';

export abstract class Key implements IActionSubscriber {
  private readonly useCmdKey = isMacKeyboard();

  protected abstract key: string;

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
