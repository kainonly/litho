import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WpxApi, WpxService } from '@weplanx/ngx';

import { Schema } from './types';

@Injectable()
export class WpxSchemaService {
  api!: WpxApi;

  constructor(private wpx: WpxService) {
    this.api = wpx.createApi('schema');
  }

  sort(id: string, fields: any): Observable<any> {
    return this.api.send('/sort', { id, fields });
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

  addField(id: string, data: Record<string, any>): Observable<any> {
    return this.api.send('/update', {
      where: { _id: id },
      update: {
        $push: { fields: data }
      }
    });
  }

  updateField(id: string, key: string, data: Record<string, any>): Observable<any> {
    return this.api.send('/update', {
      where: { _id: id, 'fields.key': key },
      update: {
        $set: {
          'fields.$': {
            key,
            ...data
          }
        }
      }
    });
  }

  removeField(id: string, key: string): Observable<any> {
    return this.api.send('/update', {
      where: { _id: id },
      update: {
        $pull: { fields: { key } }
      }
    });
  }

  getCollections(): Observable<Schema[]> {
    return this.api.find<Schema>({
      kind: 'collection'
    });
  }
}
