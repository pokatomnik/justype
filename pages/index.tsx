import * as React from 'react';
import styles from './Home.module.css';
import { Editor } from '../ui';

export default function Home() {
  return (
    <div className={styles.container}>
      <Editor />
    </div>
  );
}
