import { InjectionToken } from '@angular/core';

import { LoadOption } from '@weplanx/ng';

export const OPTION = new InjectionToken<Option>('media.option');
export interface Option extends LoadOption {
  style: {
    default: {
      thumbnail: string;
      placeholder: string;
    };
    processed: {
      thumbnail: string;
      placeholder: string;
    };
  };
}

export type Media = Picture | Video;
export type MediaType = 'pictures' | 'videos';

export interface MediaTag {
  name: string;
}

export interface Picture {
  name: string;
  url: string;
  query?: string;
  process?: PictureProcess;
  tags?: string[];
}

export interface PictureProcess {
  mode: 0 | 1 | 2 | 3;
  cut: { x: number; y: number; w: number; h: number };
  zoom: { w: number | null; h: number | null };
}

export interface Video {
  name: string;
  url: string;
  tags?: string[];
}
