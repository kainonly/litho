import { InjectionToken, Input } from '@angular/core';

import { AnyDto, LoadOption } from '@weplanx/ng';
import { Transport } from '@weplanx/ng/upload';

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

export interface WpxMediaViewData {
  wpxType: MediaType;
  wpxFallback: string;
  wpxHeight?: string;
  wpxMax?: number;
  wpxForm?: (editable: AnyDto<Media>) => void;
  wpxUpload: (data: Transport[]) => void;
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
