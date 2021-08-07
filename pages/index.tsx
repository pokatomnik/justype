import styles from './Home.module.css';
import { Editor } from '../ui/components';

export default function Home() {
  return (
    <div className={styles.container}>
      <Editor />
    </div>
  );
}
