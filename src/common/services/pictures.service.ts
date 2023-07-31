import { Injectable } from '@angular/core';

import { Picture } from '@common/models/picture';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class PicturesService extends WpxApi<Picture> {
  protected override collection = 'pictures';
}
