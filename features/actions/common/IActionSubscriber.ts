export interface IActionSubscriber {
  subscribe: (this: this, subscriber: () => void) => () => void;
}
