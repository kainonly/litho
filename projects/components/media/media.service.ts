import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '@weplanx/common';

import { Media } from './types';

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
}
