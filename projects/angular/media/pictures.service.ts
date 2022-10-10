import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { map } from 'rxjs/operators';

import { ImageInfoDto } from '@weplanx/ng';

import { MediaService } from './media.service';

@Injectable()
export class PicturesService extends MediaService {
  protected override model = 'pictures';

  /**
   * 查看图片信息
   * @param url
   */
  cosImageInfo(url: string): Observable<ImageInfoDto> {
    return this.http.get<any>(`tencent/cos-image-info`, { params: { url } }).pipe(
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
