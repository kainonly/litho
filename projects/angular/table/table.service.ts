import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Api, httpOptions } from '@weplanx/ng';

@Injectable()
export class WpxTableService extends Api<any> {
  /**
   * @param model
   * @param ids
   * @param target 引用目标名称
   */
  references(model: string, ids: string[], target: string): Observable<any> {
    if (ids.length === 0) {
      return of([]);
    }
    const options = httpOptions(
      {
        field: ['_id', target],
        format_filter: {
          '_id.$in': 'oids'
        }
      },
      { _id: { $in: ids } }
    );
    return this.http.get(this.url(model), options);
  }
}
