import { Observable } from 'rxjs';

import { Api } from '@weplanx/common';

import { Media } from './types';

export abstract class MediaService extends Api<Media> {
  /**
   * 查找标签
   */
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
