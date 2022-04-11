import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AnyDto, Api, Filter, Page, SchemaField } from '@weplanx/common';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Injectable({ providedIn: 'root' })
export class PagesSerivce extends Api<Page> {
  protected override model = 'pages';
  dict: Record<string, AnyDto<Page>> = {};
  key?: string;
  page?: AnyDto<Page>;

  getTreeNode(filter: Filter<Page> = {}): Observable<NzTreeNodeOptions[]> {
    return this.find(filter, { sort: { sort: 1 } }).pipe(
      map(v => {
        const nodes: NzTreeNodeOptions[] = [];
        const dict: Record<string, NzTreeNodeOptions> = {};
        for (const x of v) {
          this.dict[x._id] = x;
          dict[x._id] = {
            title: `${x.name}`,
            key: x._id,
            parent: x.parent,
            icon: x.icon,
            isLeaf: true,
            expanded: true,
            selectable: x.kind !== 'group'
          };
        }
        for (const x of v) {
          const options = dict[x._id];
          if (!x.parent) {
            nodes.push(options);
          } else {
            if (dict.hasOwnProperty(x.parent)) {
              if (!dict[x.parent].hasOwnProperty('children')) {
                dict[x.parent].children = [];
              }
              dict[x.parent].children!.push(options);
              dict[x.parent].isLeaf = false;
            }
          }
        }
        return nodes;
      })
    );
  }

  getPage(): Observable<AnyDto<Page>> {
    return this.findOneById(this.key!).pipe(
      map(v => {
        this.page = v;
        return v;
      })
    );
  }

  existsSchemaKey(key: string): Observable<any> {
    if (['pages', 'roles', 'department', 'users'].includes(key)) {
      return of({ error: true, duplicated: true });
    }
    return timer(500).pipe(
      switchMap(() => this.exists({ 'schema.key': key })),
      map(v => (v ? { error: true, duplicated: v } : null))
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
