import * as React from 'react';
import { EditorSaver } from './EditorSaver';
import { LocalSaver } from './LocalSaver';
import { Downloader } from '../downloader';

export function useText() {
  const [text, setText] = React.useState('');

  const { download } = Downloader.useDownload();

  const editorSaver = React.useMemo(() => {
    return new EditorSaver(new LocalSaver('text'));
  }, []);

  React.useEffect(() => {
    editorSaver.setText(text);
  }, [editorSaver, text]);

  React.useEffect(() => {
    editorSaver.initialize().then(setText).catch(console.error);
  }, [editorSaver]);

  const downloadAsFile = React.useCallback(() => {
    download('JustypeExport.md', text);
  }, [download, text]);

  return { text, setText, downloadAsFile };
}
