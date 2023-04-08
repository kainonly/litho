import { WpxVideo } from '@weplanx/ng/media';
import { Tag } from '@weplanx/ng/tags';

export interface Video extends WpxVideo {
  shop_id: string;
  tags?: string[];
}

export interface VideoTag extends Tag {
  shop_id: string;
}
