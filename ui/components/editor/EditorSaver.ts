import { schedule } from '../../../features';
import type { ISaver } from './ISaver';

export class EditorSaver {
  private cancelSaving = () => {};

  public constructor(private readonly saver: ISaver) {}

  public initialize() {
    return this.saver.load();
  }

  public setText(text: string) {
    this.cancelSaving();
    this.cancelSaving = schedule(() => {
      this.saver.save(text);
    }, 1000);
  }
}
