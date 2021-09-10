export function schedule(fn: () => void, interval: number) {
  const timerHandler = setTimeout(fn, interval);
  return () => {
    clearTimeout(timerHandler);
  };
}
