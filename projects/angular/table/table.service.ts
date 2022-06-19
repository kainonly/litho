import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnyDto, Api, httpOptions } from '@weplanx/ng';

@Injectable()
export class WpxTableService extends Api<any> {
  /**
   * 获取引用数据
   * @param model 模型命名
   * @param ids Objects 数组
   * @param target 引用目标名称
   */
  references(model: string, ids: string[], target: string): Observable<Record<string, string>> {
    if (ids.length === 0) {
      return of({});
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
    return this.http
      .get<Array<AnyDto<any>>>(`dsl/${model}`, options)
      .pipe(map(v => Object.fromEntries(v.map(v => [v._id, v[target]]))));
  }
}
