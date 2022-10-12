import { Injectable } from '@angular/core';

import { MediaService } from './media.service';

@Injectable()
export class VideosService extends MediaService {
  protected override model = 'videos';
}
