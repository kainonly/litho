import { WpxVideo } from '@weplanx/ng/media';

export interface Video extends WpxVideo {
  shop_id: string;
  tags?: string[];
}

export interface VideoTag {
  name: string;
  shop_id: string;
}
