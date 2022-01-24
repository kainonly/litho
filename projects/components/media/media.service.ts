import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Api } from '@weplanx/common';

import { ImageInfoDto, Media } from './types';

@Injectable()
export class MediaService extends Api<Media> {
  protected override model = 'media';

  findLabels(): Observable<string[]> {
    return this.http.get<string[]>(this.url('labels'));
  }

  /**
   * 批量删除
   * @param id
   */
  bulkDelete(id: string[]): Observable<any> {
    return this.http.post(this.url('bulk-delete'), { id });
  }

  /**
   * 查看图片信息
   * @param url
   */
  imageInfo(url: string): Observable<ImageInfoDto> {
    return this.http.get<any>(this.url('image-info'), { params: { url } }).pipe(
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
