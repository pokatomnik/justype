import * as React from 'react';
import styles from './Home.module.css';
import { Editor, ControlBar } from '../ui';
import { useMarkdownEnabled, useText } from '../features';

export default function Home() {
  const [markdownEnabled, toggleMarkdownEnabled] = useMarkdownEnabled(false);
  const { setText, text, downloadAsFile } = useText();

  return (
    <div className={styles.container}>
      <ControlBar
        onToggleMarkdownClick={toggleMarkdownEnabled}
        onDownloadClick={downloadAsFile}
      />
      <Editor
        markdownEnabled={markdownEnabled}
        onTextChange={setText}
        text={text}
      />
    </div>
  );
}
