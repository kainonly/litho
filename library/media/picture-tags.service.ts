import { Injectable } from '@angular/core';

import { WpxApi } from '@weplanx/ng';

import { MediaTag } from './types';

@Injectable()
export class PictureTagsService extends WpxApi<MediaTag> {
  protected override collection = 'picture_tags';
}
