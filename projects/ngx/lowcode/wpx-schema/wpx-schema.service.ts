import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WpxApi, WpxService } from '@weplanx/ngx';

@Injectable()
export class WpxSchemaService {
  api!: WpxApi;

  constructor(private wpx: WpxService) {
    this.api = wpx.createApi('schema');
  }

  existsCollection(name: string): Observable<any> {
    return this.api.send('/exists_collection', { name }).pipe(
      map(v => {
        if (!!v.code) {
          return false;
        }
        return !v.data;
      })
    );
  }
}
