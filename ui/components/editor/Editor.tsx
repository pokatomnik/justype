import * as React from 'react';
import { Observer } from 'mobx-react';
import styles from './Editor.module.css';

import { EditorState } from './EditorState';
import { LocalSaver } from './LocalSaver';

export class Editor extends React.Component<object, object> {
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
          <textarea
            ref={this.textareaRef}
            placeholder="Type here..."
            className={styles.editor}
            value={this.editorState.text}
            onChange={this.setText}
          />
        )}
      </Observer>
    );
  }
}
