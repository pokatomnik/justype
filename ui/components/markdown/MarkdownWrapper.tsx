import * as React from 'react';
import styles from './MarkdownWrapper.module.css';

export function MarkdownWrapper(props: React.PropsWithChildren<object>) {
  return <div className={styles.wrapper}>{props.children}</div>;
}
