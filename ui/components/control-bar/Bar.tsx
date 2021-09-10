import { Button } from '../button';
import styles from './Bar.module.css';

interface IControlBarProps {
  onToggleMarkdownClick: () => void;
}

export function ControlBar(props: IControlBarProps) {
  return (
    <div className={styles.bar}>
      <Button onClick={props.onToggleMarkdownClick}>Toggle Markdown</Button>
    </div>
  );
}
