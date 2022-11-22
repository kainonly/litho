export interface RichtextValue {
  title: string;
  blocks: Block[];
  time: number;
  version: string;
}

export interface Block {
  id: string;
  type: string;
  data: any;
}

export type ResolveDone = (data: Data) => void;

export interface Data {
  assets: string;
  url: string;
}

export interface Config {
  resolve: (done: ResolveDone) => void;
  change: () => void;
}
