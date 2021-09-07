import * as React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import * as Elements from './Elements';

import { MarkdownWrapper } from './MarkdownWrapper';

interface IMarkdownProps {
  onClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
  children: string;
}

export class Markdown extends React.Component<IMarkdownProps> {
  private static readonly options: React.ComponentProps<
    typeof ReactMarkdown
  >['options'] = {
    overrides: {
      code: Elements.Code,
      pre: Elements.Pre,
    },
  };

  public render() {
    return (
      <MarkdownWrapper onClick={this.props.onClick}>
        <ReactMarkdown options={Markdown.options}>
          {this.props.children}
        </ReactMarkdown>
      </MarkdownWrapper>
    );
  }
}
