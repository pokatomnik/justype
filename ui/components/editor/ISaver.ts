export interface ISaver {
  save: (text: string) => Promise<void>;
  load: () => Promise<string>;
}
