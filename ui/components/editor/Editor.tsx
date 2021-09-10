import * as React from 'react';
import styles from './Editor.module.css';

import { EditorSaver } from './EditorSaver';
import { LocalSaver } from './LocalSaver';
import { Markdown } from '../markdown';
import { If } from '../conditional';

interface IEditorProps {
  markdownEnabled: boolean;
}

export function Editor(props: IEditorProps) {
  const [text, setText] = React.useState('');

  const editorSaver = React.useMemo(() => {
    return new EditorSaver(new LocalSaver('text'));
  }, []);

  const textareaHandleChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = evt.currentTarget.value;
      setText(text);
      editorSaver.setText(text);
    },
    [editorSaver]
  );

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    textareaRef.current?.focus();
    editorSaver.initialize().then(setText).catch(console.error);
  }, [editorSaver]);

  return (
    <React.Fragment>
      <If cond={props.markdownEnabled}>{() => <Markdown>{text}</Markdown>}</If>
      <If cond={!props.markdownEnabled}>
        {() => (
          <textarea
            ref={textareaRef}
            placeholder="Type here... (Double click to toggle Markdown View mode)"
            className={styles.editor}
            value={text}
            onChange={textareaHandleChange}
          />
        )}
      </If>
    </React.Fragment>
  );
}
