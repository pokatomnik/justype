import * as React from 'react';
import { BroadcastContext } from './BroadcastContext';
import { Broadcast } from './Broadcast';

export function makeBroadcastProvider(name: string) {
  return function BroadcastProvider(props: React.PropsWithChildren<object>) {
    const broadcastRef = React.useRef(new Broadcast(name));

    React.useEffect(() => {
      return () => {
        broadcastRef.current.dispose();
      };
    }, []);

    return (
      <BroadcastContext.Provider value={broadcastRef.current}>
        {props.children}
      </BroadcastContext.Provider>
    );
  };
}
