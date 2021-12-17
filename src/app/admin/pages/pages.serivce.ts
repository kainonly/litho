import { Injectable } from '@angular/core';
import { AsyncSubject, Observable, Subject, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Api, WpxService } from '@weplanx/components';

import { Field } from './dto/field';

@Injectable()
export class PagesSerivce {
  key$: AsyncSubject<string> = new AsyncSubject<string>();
  refresh: Subject<any> = new Subject<any>();

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

  updateSchemaField(id: string, key: string, data: Field): Observable<any> {
    return this.api.updateById(id, {
      [`schema.fields.${key}`]: data
    });
  }

  sortSchemaFields(id: string, fields: string[]): Observable<any> {
    return this.api.send('/sort_schema_fields', { id, fields });
  }

  deleteSchemaField(id: string, key: string): Observable<any> {
    return this.api.send('/delete_schema_field', { id, key });
  }

  findIndexes(id: string): Observable<any> {
    return this.api.send('/find_indexes', { id }).pipe(map(v => (!v.code ? v.data : null)));
  }

  createIndex(id: string, name: string, keys: any[], unique: boolean): Observable<any> {
    return this.api.send('/create_index', { id, name, keys, unique });
  }

  deleteIndex(id: string, name: string): Observable<any> {
    return this.api.send('/delete_index', { id, name });
  }

  updateValidator(id: string, validator: string): Observable<any> {
    return this.api.send('/update_validator', { id, validator });
  }
}
