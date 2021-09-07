import * as React from 'react';
import styles from './MarkdownWrapper.module.css';

interface IMarkdownWrapperProps {
  onClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
}

export function MarkdownWrapper(
  props: React.PropsWithChildren<IMarkdownWrapperProps>
) {
  return (
    <div className={styles.wrapper} onClick={props.onClick}>
      {props.children}
    </div>
  );
}
