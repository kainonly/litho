import { WpxVideo } from '@weplanx/ng/media';
import { WpxQuick } from '@weplanx/ng/quick';

export interface Video extends WpxVideo {
  shop_id: string;
  tags?: string[];
}

export interface VideoTag extends WpxQuick {
  shop_id: string;
}
