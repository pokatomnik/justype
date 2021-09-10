import * as React from 'react';

import { Markdown } from '../markdown';
import { If } from '../conditional';
import { Textarea } from './Textarea';

interface IEditorProps {
  markdownEnabled: boolean;
  text: string;
  onTextChange: (text: string) => void;
}

export function Editor(props: IEditorProps) {
  return (
    <React.Fragment>
      <If cond={props.markdownEnabled}>
        {() => <Markdown>{props.text}</Markdown>}
      </If>
      <If cond={!props.markdownEnabled}>
        {() => <Textarea text={props.text} onChange={props.onTextChange} />}
      </If>
    </React.Fragment>
  );
}
