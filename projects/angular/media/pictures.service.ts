import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';

import { MediaService } from './media.service';
import { ImageInfoDto } from './types';

@Injectable()
export class PicturesService extends MediaService {
  protected override model = 'pictures';

  /**
   * 查看图片信息
   * @param url
   */
  imageInfo(url: string): Observable<ImageInfoDto> {
    return this.http.get<any>(this.url('image-info'), { params: { url } }).pipe(
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
