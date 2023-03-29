import { Injectable } from '@angular/core';

import { WpxApi } from '@weplanx/ng';

import { Video } from './types';

@Injectable()
export class VideosService extends WpxApi<Video> {
  protected override collection = 'videos';
}
