import { action, computed, makeObservable, observable } from 'mobx';
import { schedule } from './Timer';
import type { ISaver } from './ISaver';

export class EditorState {
  private cancelSaving = () => {};

  private _text: string = '';

  public constructor(private readonly saver: ISaver) {
    makeObservable<this, '_text'>(this, {
      _text: observable,
      text: computed,
      setText: action,
    });
  }

  public initialize() {
    this.saver.load().then((initialText) => {
      this._text = initialText;
    });
  }

  public get text() {
    return this._text;
  }

  public setText(text: string) {
    this.cancelSaving();
    this._text = text;
    this.cancelSaving = schedule(() => {
      this.saver.save(this._text);
    }, 1000);
  }
}
