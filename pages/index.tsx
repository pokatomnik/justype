import * as React from 'react';
import styles from './Home.module.css';
import { Editor, ControlBar } from '../ui';

export default function Home() {
  const [markdownEnabled, setMarkdownEabled] = React.useState(false);

  const toggleMarkdownClick = React.useCallback(() => {
    setMarkdownEabled((markdownEnabled) => {
      return !markdownEnabled;
    });
  }, []);

  return (
    <div className={styles.container}>
      <ControlBar onToggleMarkdownClick={toggleMarkdownClick} />
      <Editor markdownEnabled={markdownEnabled} />
    </div>
  );
}
