import { Injectable } from '@angular/core';

import { VideoTag } from '@common/interfaces/video';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class VideoTagsService extends WpxApi<VideoTag> {
  protected override collection = 'video_tags';
}
