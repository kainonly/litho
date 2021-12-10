import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Api, WpxService } from '@weplanx/components';

@Injectable()
export class PagesSerivce {
  api!: Api;

  constructor(private wpx: WpxService) {
    this.api = wpx.api('pages');
  }

  checkKey(value: string): Observable<any> {
    return timer(500).pipe(
      switchMap(() => this.api.send('/check_key', { value })),
      map(v => {
        if (v.code !== 0) {
          return { error: true };
        }
        switch (v.data) {
          case 'duplicated':
            return { error: true, duplicated: true };
          case 'history':
            return { error: true, history: true };
        }
        return null;
      })
    );
  }

  reorganization(id: string, parent: string, sort: string[]): Observable<any> {
    return this.api.send('/reorganization', { id, parent, sort });
  }

  sortSchemaFields(id: string, fields: string[]): Observable<any> {
    return this.api.send('/sort_schema_fields', { id, fields });
  }

  deleteSchemaField(id: string, key: string) {
    return this.api.send('/delete_schema_field', { id, key });
  }
}
