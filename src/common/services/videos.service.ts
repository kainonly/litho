import { Injectable } from '@angular/core';

import { Video } from '@common/models/video';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class PicturesService extends WpxApi<Video> {
  protected override collection = 'videos';
}
