import * as React from 'react';
import styles from './Editor.module.css';

import { EditorSaver } from './EditorSaver';
import { LocalSaver } from './LocalSaver';
import { makeClicker } from '../clicker';
import { Markdown } from '../markdown';
import { If } from '../conditional';

const Clicker = makeClicker({
  clicksToGo: 2,
  threshold: 500,
});

export function Editor() {
  const [text, setText] = React.useState('');
  const [markdownEnabled, setMakdownEnabled] = React.useState(false);

  const editorSaver = React.useMemo(() => {
    return new EditorSaver(new LocalSaver('text'));
  }, []);

  const toggleMarkdown = React.useCallback(() => {
    setMakdownEnabled((markdownEnabled) => {
      return !markdownEnabled;
    });
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
      <If cond={markdownEnabled}>
        {() => (
          <Clicker<HTMLDivElement> clickHandler={toggleMarkdown}>
            {(onClick) => <Markdown onClick={onClick}>{text}</Markdown>}
          </Clicker>
        )}
      </If>
      <If cond={!markdownEnabled}>
        {() => (
          <Clicker<HTMLTextAreaElement> clickHandler={toggleMarkdown}>
            {(onClick) => (
              <textarea
                ref={textareaRef}
                placeholder="Type here... (Double click to toggle Markdown View mode)"
                className={styles.editor}
                value={text}
                onChange={textareaHandleChange}
                onClick={onClick}
              />
            )}
          </Clicker>
        )}
      </If>
    </React.Fragment>
  );
}
