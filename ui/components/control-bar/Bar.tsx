import * as React from 'react';
import { Button } from '../button';
import styles from './Bar.module.css';

interface IControlBarProps {
  onToggleMarkdownClick: () => void;
  onDownloadClick: () => void;
}

export function ControlBar(props: IControlBarProps) {
  const handleCreditsPress = React.useCallback(() => {
    window.open('https://www.freepik.com', '_blank');
  }, []);

  return (
    <div className={styles.bar}>
      <Button onClick={props.onToggleMarkdownClick}>Toggle Markdown</Button>
      <Button onClick={props.onDownloadClick}>Download</Button>
      <Button onClick={handleCreditsPress}>Icons made by Freepik</Button>
    </div>
  );
}
