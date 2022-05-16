import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AnyDto, Api, Filter, Page, SchemaField } from '@weplanx/ng';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Injectable({ providedIn: 'root' })
export class PagesSerivce extends Api<Page> {
  protected override model = 'pages';
  dict: Record<string, AnyDto<Page>> = {};
  id?: string;
  page?: AnyDto<Page>;

  getTreeNode(filter: Filter<Page> = {}, selectable = true): Observable<NzTreeNodeOptions[]> {
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
            selectable: selectable || x.kind !== 'group'
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
    return this.findOneById(this.id!).pipe(
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

  reorganization(id: string, parent: null | string): Observable<any> {
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

  addSchemaRule(id: string, data: any): Observable<any> {
    return this.updateOneById(id, { $push: { 'schema.rules': data } });
  }

  updateSchemaAdvanced(id: string, data: any): Observable<any> {
    return this.updateOneById(id, {
      $set: {
        'schema.event': data.event
      }
    });
  }

  /**
   * 获取引用模型
   */
  getReferences(): Observable<Array<AnyDto<Page>>> {
    return this.find(
      { schema: { $exists: true } },
      {
        field: ['_id', 'name', 'schema']
      }
    );
  }

  /**
   * 获取索引
   */
  getIndexes(): Observable<any> {
    return this.http.get(this.url('_indexes', this.id!));
  }

  /**
   * 创建索引
   * @param index
   * @param data
   */
  createIndex(index: string, data: any): Observable<any> {
    return this.http.put(this.url('_indexes', this.id!, index), data);
  }

  /**
   * 删除索引
   * @param index
   */
  deleteIndex(index: string): Observable<any> {
    return this.http.delete(this.url('_indexes', this.id!, index));
  }
}
