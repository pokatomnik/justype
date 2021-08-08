export const isMacKeyboard = (() => {
  let isMac: undefined | boolean = undefined;
  return () => {
    if (isMac === undefined) {
      isMac = navigator.platform.toLocaleLowerCase().indexOf('mac') !== -1;
    }
    return isMac;
  };
})();
