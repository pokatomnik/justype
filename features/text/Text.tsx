import * as React from 'react';
import { EditorSaver } from './EditorSaver';
import { LocalSaver } from './LocalSaver';
import { Downloader } from '../downloader';
import * as Broadcast from '../broadcast';

export function useText() {
  const { subscribe } = Broadcast.useSubscriber();
  const { dispatch } = Broadcast.useDispatcher();
  const [text, setText] = React.useState('');

  const { download } = Downloader.useDownload();

  const editorSaver = React.useMemo(() => {
    return new EditorSaver(new LocalSaver('text'));
  }, []);

  React.useEffect(() => {
    editorSaver.setText(text);
  }, [editorSaver, text]);

  /**
   * Subscribe local storage
   */
  React.useEffect(() => {
    editorSaver.initialize().then(setText).catch(console.error);
  }, [editorSaver]);

  /**
   * Subscribe broadcast
   */
  React.useEffect(() => {
    return subscribe(setText);
  }, [subscribe]);

  const outerSetText = React.useCallback(
    (text: string) => {
      setText(text);
      dispatch(text);
    },
    [dispatch]
  );

  const downloadAsFile = React.useCallback(() => {
    download('JustypeExport.md', text);
  }, [download, text]);

  return { text, setText: outerSetText, downloadAsFile };
}
