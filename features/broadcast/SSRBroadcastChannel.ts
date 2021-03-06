import noop from 'lodash/noop';
import stubFalse from 'lodash/stubFalse';
import { BroadcastChannel } from 'broadcast-channel';

export const SSRBroadcastChannel: BroadcastChannel = {
  addEventListener: noop,
  close: () => Promise.resolve(),
  name: '',
  onmessage: noop,
  postMessage: (v) => Promise.resolve(),
  removeEventListener: noop,
  isClosed: false,
  options: {},
  type: 'simulate',
};
