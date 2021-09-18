import * as React from 'react';
import styles from './Textarea.module.css';

interface ITextareaProps {
  text: string;
  onChange: (text: string) => void;
}

export function Textarea(props: ITextareaProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const textareaHandleChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      props.onChange(evt.currentTarget.value);
    },
    [props.onChange]
  );

  React.useLayoutEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <textarea
      ref={textareaRef}
      placeholder="Type here..."
      className={styles.textarea}
      value={props.text}
      onChange={textareaHandleChange}
    />
  );
}
