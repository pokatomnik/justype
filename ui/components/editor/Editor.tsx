import * as React from 'react';
import { Observer } from 'mobx-react';
import styles from './Editor.module.css';

import { EditorState } from './EditorState';
import { LocalSaver } from './LocalSaver';
import { makeClicker } from '../clicker';
import { Markdown } from '../markdown';
import { If } from '../conditional';

export class Editor extends React.Component<object, object> {
  private static Clicker = makeClicker({
    clicksToGo: 2,
    threshold: 500,
  });

  private textareaRef = React.createRef<HTMLTextAreaElement>();

  private readonly editorState = new EditorState(new LocalSaver('text'));

  private setText = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.editorState.setText(evt.currentTarget.value);
  };

  public componentDidMount() {
    this.editorState.initialize();
    this.textareaRef.current?.focus();
  }

  public render() {
    return (
      <Observer>
        {() => (
          <React.Fragment>
            <If cond={this.editorState.markdownEnabled}>
              {() => (
                <Editor.Clicker<HTMLDivElement>
                  clickHandler={this.editorState.toggleMarkdown}
                >
                  {(onClick) => (
                    <Observer>
                      {() => (
                        <Markdown onClick={onClick}>
                          {this.editorState.text}
                        </Markdown>
                      )}
                    </Observer>
                  )}
                </Editor.Clicker>
              )}
            </If>
            <If cond={!this.editorState.markdownEnabled}>
              {() => (
                <Editor.Clicker<HTMLTextAreaElement>
                  clickHandler={this.editorState.toggleMarkdown}
                >
                  {(onClick) => (
                    <Observer>
                      {() => (
                        <textarea
                          ref={this.textareaRef}
                          placeholder="Type here... (Double click to toggle Markdown View mode)"
                          className={styles.editor}
                          value={this.editorState.text}
                          onChange={this.setText}
                          onClick={onClick}
                        />
                      )}
                    </Observer>
                  )}
                </Editor.Clicker>
              )}
            </If>
          </React.Fragment>
        )}
      </Observer>
    );
  }
}
