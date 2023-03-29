import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { map } from 'rxjs/operators';

import { ImageInfoDto, WpxApi } from '@weplanx/ng';

import { Picture } from './types';

@Injectable()
export class PicturesService extends WpxApi<Picture> {
  protected override collection = 'pictures';

  getCosImageInfo(url: string): Observable<ImageInfoDto> {
    return this.http.get<any>(`tencent/cos_image_info`, { params: { url } }).pipe(
      retry(2),
      map(v => {
        v.size = parseInt(v.size);
        v.height = parseInt(v.height);
        v.width = parseInt(v.width);
        v.format = v.format === 'unknown' ? 'avif' : v.format;
        return v;
      })
    );
  }
}
