import { Any } from '@weplanx/ng';

export interface Option {
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

export type WpxFileType = 'picture' | 'video';
export interface WpxFile {
  name: string;
  url: string;
  query?: string;
  process?: Any;
  categories: string[];
}
