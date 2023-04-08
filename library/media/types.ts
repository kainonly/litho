import { InjectionToken, TemplateRef } from '@angular/core';

import { AnyDto, LoadOption } from '@weplanx/ng';
import { Transport } from '@weplanx/ng/upload';

import { WpxMediaDataSource } from './media.data-source';

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

export interface WpxMediaData {
  type: WpxMediaType;
  fallback: string;
  height?: string;
  max?: number;
  footer?: TemplateRef<any>;
}

export type WpxMedia = WpxPicture | WpxVideo;
export type WpxMediaType = 'pictures' | 'videos';

export interface WpxPicture {
  name: string;
  url: string;
  query?: string;
  process?: WpxPictureProcess;
}

export interface WpxPictureProcess {
  mode: 0 | 1 | 2 | 3;
  cut: { x: number; y: number; w: number; h: number };
  zoom: { w: number | null; h: number | null };
}

export interface WpxVideo {
  name: string;
  url: string;
}
