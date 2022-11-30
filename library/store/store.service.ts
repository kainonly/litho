import { Inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { OPTION, Option } from './types';

@Injectable()
export class WpxStoreService {
  private db!: PouchDB.Database;

  constructor(@Inject(OPTION) option: Option) {
    this.db = new PouchDB(option.name, {
      adapter: 'idb'
    });
  }

  /**
   * 获取文档
   * @param _id
   */
  get<Model>(_id: string): Observable<PouchDB.Core.Document<Model> & PouchDB.Core.GetMeta> {
    return from(this.db.get<Model>(_id));
  }

  /**
   * 创建或更新文档
   * @param _id
   * @param value
   * @param _rev
   */
  set<Model>(_id: string, value: Model, _rev?: string): Observable<PouchDB.Core.Response> {
    return from(this.db.put({ _id, ...value, _rev }));
  }

  /**
   * 销毁本地存储
   */
  destroy(): Observable<void> {
    return from(this.db.destroy());
  }
}
