import { Injectable } from '@angular/core';

import { WpxApi } from '@weplanx/ng';

import { WpxVideo } from '../types';

@Injectable()
export class VideosService extends WpxApi<WpxVideo> {
  protected override collection = 'videos';
}
