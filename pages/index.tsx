import * as React from 'react';
import styles from './Home.module.css';
import { Editor, Name } from '../ui/components';
import { Open, Save } from '../features/actions';

export default function Home() {
  const handleSave = React.useCallback(() => {
    console.log('Save!');
  }, []);

  const handleOpen = React.useCallback(() => {
    console.log('Open!');
  }, []);

  React.useEffect(() => {
    const unsubscribeFromSave = new Save().subscribe(handleSave);
    return () => {
      unsubscribeFromSave();
    };
  }, [handleSave]);

  React.useEffect(() => {
    const unsubscribeFromOpen = new Open().subscribe(handleOpen);
    return () => {
      unsubscribeFromOpen();
    };
  }, [handleOpen]);

  return (
    <div className={styles.container}>
      <Name />
      <Editor />
    </div>
  );
}
