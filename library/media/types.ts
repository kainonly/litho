import { InjectionToken } from '@angular/core';

import { LoadOption } from '@weplanx/ng';

export const OPTION = new InjectionToken<Option>('media.option');
export interface Option extends LoadOption {}

export type Media = Picture | Video;
export type MediaType = 'pictures' | 'videos';

export interface MediaTag {
  name: string;
}

export interface Picture {
  name: string;
  url: string;
  params?: Record<string, string>;
  tags?: string[];
}

export interface Video {
  name: string;
  url: string;
  tags?: string[];
}
