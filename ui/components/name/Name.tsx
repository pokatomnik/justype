import styles from './Name.module.css';

export function Name() {
  return <input placeholder="Name" className={styles.name} type="text" />;
}
