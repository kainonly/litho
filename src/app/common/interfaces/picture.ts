import { WpxPicture } from '@weplanx/ng/media';

export interface Picture extends WpxPicture {
  tags?: string[];
}

export interface PictureTag {
  name: string;
}
