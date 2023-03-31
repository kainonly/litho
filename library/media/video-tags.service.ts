import { Injectable } from '@angular/core';

import { WpxApi } from '@weplanx/ng';

import { MediaTag } from './types';

@Injectable()
export class VideoTagsService extends WpxApi<MediaTag> {
  protected override collection = 'video_tags';
}
