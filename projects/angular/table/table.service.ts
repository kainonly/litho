import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnyDto, Api, setHttpOptions } from '@weplanx/ng';

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
    return this.http
      .get<Array<AnyDto<any>>>(
        `dsl/${model}`,
        setHttpOptions(
          { _id: { $in: ids } },
          {
            keys: { [target]: 1 },
            xfilter: {
              '_id.$in': 'oids'
            }
          }
        )
      )
      .pipe(map(v => Object.fromEntries(v.map(v => [v._id, v[target]]))));
  }
}
