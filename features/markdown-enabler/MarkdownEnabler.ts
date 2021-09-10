import * as React from 'react';

export function useMarkdownEnabled(initial: boolean) {
  const [markdownEnabled, setMarkdownEabled] = React.useState(initial);

  const toggleMarkdownEnabled = React.useCallback(() => {
    setMarkdownEabled((markdownEnabled) => {
      return !markdownEnabled;
    });
  }, []);

  return [markdownEnabled, toggleMarkdownEnabled] as const;
}
