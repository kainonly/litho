import { WpxVideo } from '@weplanx/ng/media';
import { Quick } from '@weplanx/ng/quick';

export interface Video extends WpxVideo {
  shop_id: string;
  tags?: string[];
}

export interface VideoTag extends Quick {
  shop_id: string;
}
