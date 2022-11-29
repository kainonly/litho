import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { WpxService } from '@weplanx/ng';

import { Option } from './types';

@Injectable({ providedIn: 'root' })
export class WpxStoreService {
  private db!: PouchDB.Database;

  constructor(private wpx: WpxService) {}

  initialize(option: Option): void {
    this.wpx.loadScript(option.url, option.plugins).subscribe(() => {
      this.db = new PouchDB(option.name, {
        adapter: 'idb'
      });
    });
  }

  get<Model>(_id: string): Observable<PouchDB.Core.Document<Model> & PouchDB.Core.GetMeta> {
    console.log(this.db);
    return from(this.db.get<Model>(_id));
  }

  set<Model>(_id: string, value: Model, _rev?: string): Observable<PouchDB.Core.Response> {
    return from(this.db.put({ _id, ...value, _rev }));
  }
}
