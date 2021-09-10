import type { ISaver } from './ISaver';

export class LocalSaver implements ISaver {
  public constructor(private readonly key: string) {}

  public async save(text: string) {
    localStorage.setItem(this.key, text);
  }

  public async load() {
    return localStorage.getItem(this.key) || '';
  }
}
