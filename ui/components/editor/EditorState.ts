import { action, computed, makeObservable, observable } from 'mobx';
import { schedule } from '../../../features';
import type { ISaver } from './ISaver';

export class EditorState {
  private cancelSaving = () => {};

  private _text: string = '';

  private _markdownEnabled = false;

  public constructor(private readonly saver: ISaver) {
    makeObservable<this, '_text' | '_markdownEnabled'>(this, {
      _text: observable,
      _markdownEnabled: observable,
      text: computed,
      markdownEnabled: computed,
      setText: action,
      toggleMarkdown: action.bound,
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

  public get markdownEnabled() {
    return this._markdownEnabled;
  }

  public toggleMarkdown() {
    this._markdownEnabled = !this._markdownEnabled;
  }

  public setText(text: string) {
    this.cancelSaving();
    this._text = text;
    this.cancelSaving = schedule(() => {
      this.saver.save(this._text);
    }, 1000);
  }
}
