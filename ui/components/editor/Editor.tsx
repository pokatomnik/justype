import * as React from 'react';

import { EditorSaver } from './EditorSaver';
import { LocalSaver } from './LocalSaver';
import { Markdown } from '../markdown';
import { If } from '../conditional';
import { Textarea } from './Textarea';

interface IEditorProps {
  markdownEnabled: boolean;
}

export function Editor(props: IEditorProps) {
  const [text, setText] = React.useState('');

  const editorSaver = React.useMemo(() => {
    return new EditorSaver(new LocalSaver('text'));
  }, []);

  const textareaHandleChange = React.useCallback(
    (text: string) => {
      setText(text);
      editorSaver.setText(text);
    },
    [editorSaver]
  );

  React.useEffect(() => {
    editorSaver.initialize().then(setText).catch(console.error);
  }, [editorSaver]);

  return (
    <React.Fragment>
      <If cond={props.markdownEnabled}>{() => <Markdown>{text}</Markdown>}</If>
      <If cond={!props.markdownEnabled}>
        {() => <Textarea text={text} onChange={textareaHandleChange} />}
      </If>
    </React.Fragment>
  );
}
