import { Injectable } from '@angular/core';

import { WpxApi } from '@weplanx/ng';
import { Tag } from '@weplanx/ng/tags';

@Injectable({ providedIn: 'root' })
export class VideoTagsService extends WpxApi<Tag> {
  protected override collection = 'video_tags';
}
