import { isMacKeyboard } from './MacKeyboard';

export function getControlCharacter() {
  return isMacKeyboard() ? '⌘' : 'Control';
}
