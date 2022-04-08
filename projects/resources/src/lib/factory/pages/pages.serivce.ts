import { Injectable } from '@angular/core';
import { AsyncSubject, Observable, Subject, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Api, Page, SchemaField } from '@weplanx/common';

@Injectable({ providedIn: 'root' })
export class PagesSerivce extends Api<Page> {
  protected override model = 'pages';
  key$: AsyncSubject<string> = new AsyncSubject<string>();
  refresh: Subject<any> = new Subject<any>();

  hasSchemaKey(key: string): Observable<any> {
    return timer(500).pipe(
      switchMap(() =>
        this.http.get<any>(this.url('has-schema-key'), {
          params: { key }
        })
      ),
      map(v => {
        if (v.status === '') {
          return null;
        }
        return { error: true, [v.status]: true };
      })
    );
  }

  reorganization(id: string, parent: string): Observable<any> {
    return this.updateOneById(
      id,
      {
        $set: {
          parent
        }
      },
      {
        format_doc: {
          parent: 'oid'
        }
      }
    );
  }

  sort(sort: string[]): Observable<any> {
    return this.http.patch(this.url('sort'), { sort });
  }

  updateSchemaField(id: string, key: string, data: SchemaField): Observable<any> {
    return this.updateOneById(id, {
      $set: {
        [`schema.fields.${key}`]: data
      }
    });
  }

  sortSchemaFields(id: string, fields: string[]): Observable<any> {
    const values: Record<string, number> = {};
    fields.forEach((value, index) => {
      values[`schema.fields.${value}.sort`] = index;
    });
    return this.updateOneById(id, { $set: values });
  }

  deleteSchemaField(id: string, key: string): Observable<any> {
    return this.updateOneById(id, {
      $unset: {
        [`schema.fields.${key}`]: ''
      }
    });
  }

  findIndexes(id: string): Observable<any> {
    return this.http.get(this.url(id, 'indexes'));
  }

  createIndex(id: string, name: string, data: any): Observable<any> {
    return this.http.put(this.url(id, 'indexes', name), data);
  }

  deleteIndex(id: string, name: string): Observable<any> {
    return this.http.delete(this.url(id, 'indexes', name));
  }

  updateValidator(id: string, validator: string): Observable<any> {
    return this.updateOneById(id, {
      $set: {
        [`schema.validator`]: validator
      }
    });
  }
}
