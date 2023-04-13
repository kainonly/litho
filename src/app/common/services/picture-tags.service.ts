import { Injectable } from '@angular/core';

import { WpxApi } from '@weplanx/ng';
import { Quick } from '@weplanx/ng/quick';

@Injectable({ providedIn: 'root' })
export class PictureTagsService extends WpxApi<Quick> {
  protected override collection = 'picture_tags';
}
