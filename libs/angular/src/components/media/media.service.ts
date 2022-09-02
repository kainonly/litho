import { Observable } from 'rxjs';

import { Api } from '@weplanx/ng';

import { Media } from '../../types';

export abstract class MediaService extends Api<Media> {
  /**
   * 查找标签
   */
  findLabels(): Observable<string[]> {
    return this.http.get<string[]>(this.url('labels'));
  }
}
