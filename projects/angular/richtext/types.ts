export type ResolveDone = (data: Data) => void;

export interface Data {
  assets: string;
  url: string;
}

export interface Config {
  resolve: (done: ResolveDone) => void;
  change: () => void;
}
