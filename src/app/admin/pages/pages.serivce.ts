import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Api, WpxService } from '@weplanx/components';

@Injectable()
export class PagesSerivce {
  api!: Api;

  constructor(private wpx: WpxService) {
    this.api = wpx.api('pages');
  }

  existsKey(value: string): Observable<any> {
    return this.api.send('/exists_key', { value }).pipe(
      map(v => {
        if (!!v.code) {
          return false;
        }
        return !v.data;
      })
    );
  }
}
