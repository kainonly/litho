import { Injectable } from '@angular/core';

import { PictureTag } from '@common/interfaces/picture';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class PictureTagsService extends WpxApi<PictureTag> {
  protected override collection = 'picture_tags';
}
