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

  sort(id: string, fields: any): Observable<any> {
    return this.api.send('/sort', { id, fields });
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

  sortFields(id: string, fields: any): Observable<any> {
    return this.api.send('/sort_fields', { id, fields });
  }
}
