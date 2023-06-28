import { InjectionToken } from '@angular/core';

import { LoadOption } from '@weplanx/ng';

export const OPTION = new InjectionToken<LoadOption>('richtext.option');

export type RichtextData = {
  blocks: Block[];
  time: number;
  version: string;
} & null;

export interface Block {
  id: string;
  type: string;
  data: any;
}

export type ResolveDone = (data: MediaData) => void;

export interface MediaData {
  assets: string;
  url: string;
}

export interface Config {
  resolve: (done: ResolveDone) => void;
  change: () => void;
}
