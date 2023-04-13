import { Injectable } from '@angular/core';

import { WpxApi } from '@weplanx/ng';
import { WpxQuick } from '@weplanx/ng/quick';

@Injectable({ providedIn: 'root' })
export class PictureTagsService extends WpxApi<WpxQuick> {
  protected override collection = 'picture_tags';
}
