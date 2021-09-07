import * as React from 'react';

interface IIfProps {
  cond: boolean;
  children: () => React.ReactNode;
}

export function If(props: IIfProps) {
  if (!props.cond) {
    return <React.Fragment />;
  }

  return <React.Fragment>{props.children()}</React.Fragment>;
}
