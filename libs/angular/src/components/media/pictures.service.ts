import { Injectable } from '@angular/core';

import { MediaService } from './media.service';

@Injectable()
export class PicturesService extends MediaService {
  protected override model = 'pictures';
}
