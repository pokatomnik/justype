import * as React from 'react';
import * as Detection from '../../../features/detection';
import styles from './Editor.module.css';

export function Editor() {
  const [placeholder, setPlaceholder] = React.useState('');

  React.useEffect(() => {
    const placeholderBase = 'Your text here...';
    const controlKey = Detection.getControlCharacter();
    const hasTouchPoints = Detection.getTouchPointsNumber() > 0;
    const desktopPlaceholder = `${placeholderBase} (use ${controlKey}+S to save or ${controlKey}+O to open)`;
    const mobilePlaceholder = `${placeholderBase} (swipe left to save or swipe right to open)`;
    setPlaceholder(hasTouchPoints ? mobilePlaceholder : desktopPlaceholder);
  }, []);

  return (
    <textarea autoFocus placeholder={placeholder} className={styles.editor} />
  );
}
