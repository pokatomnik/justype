import * as React from 'react';
import styles from './Editor.module.css';

export function Editor() {
  const [text, setText] = React.useState('');

  const handleChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(evt.currentTarget.value);
    },
    []
  );

  return (
    <textarea
      autoFocus
      placeholder="Type here..."
      className={styles.editor}
      value={text}
      onChange={handleChange}
    />
  );
}
