export interface IActionSubscriber<E extends unknown> {
  subscribe: (subscriber: (evt: E) => void) => () => void;
}
