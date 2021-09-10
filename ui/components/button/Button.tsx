import * as React from 'react';
import styles from './Button.module.css';

interface IButtonProps {
  onClick: () => void;
}

export function Button(props: React.PropsWithChildren<IButtonProps>) {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
