export function subscribe<K extends keyof DocumentEventMap>(
  eventName: K,
  listener: <
    E extends DocumentEventMap[K] extends globalThis.TouchEvent
      ? DocumentEventMap[K]
      : unknown
  >(
    evt: E
  ) => void
) {
  window.document.addEventListener(eventName, listener);
  return () => {
    window.document.removeEventListener(eventName, listener);
  };
}
