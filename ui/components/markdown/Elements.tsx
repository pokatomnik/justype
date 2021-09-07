import * as React from 'react';
import styles from './Elements.module.css';

interface IElementProps {
  className?: string;
}

function makeElement(tag: keyof React.ReactHTML, className: string) {
  return function MarkdownElement(
    props: React.PropsWithChildren<IElementProps>
  ) {
    const componentProps = {
      ...props,
      className: props.className
        ? `${props.className} ${className}`
        : className,
    };
    return React.createElement(tag, componentProps, props.children);
  };
}

export const Code = makeElement('code', styles.code);

export const Pre = makeElement('pre', styles.pre);
