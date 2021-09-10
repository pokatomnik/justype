import { Button } from '../button';
import styles from './Bar.module.css';

interface IControlBarProps {
  onToggleMarkdownClick: () => void;
  onDownloadClick: () => void;
}

export function ControlBar(props: IControlBarProps) {
  return (
    <div className={styles.bar}>
      <Button onClick={props.onToggleMarkdownClick}>Toggle Markdown</Button>
      <Button onClick={props.onDownloadClick}>Download</Button>
    </div>
  );
}
