import { Injectable } from '@angular/core';

import { Imessage } from '@common/models/imessage';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class ImessagesService extends WpxApi<Imessage> {
  protected override collection = 'imessages';
}
