import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AnyDto, WpxApi, UpdateOneByIdOption, Page, SchemaField } from '@weplanx/ng';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { PageNode } from './types';

@Injectable()
export class PagesService extends WpxApi<Page> {
  protected override collection = 'pages';
  /**
   * 页面单元字典
   */
  dict: Record<string, AnyDto<Page>> = {};

  /**
   * 获取树视图节点
   */
  getNodes(): Observable<PageNode[]> {
    return this.find({}, { sort: { sort: 1 } }).pipe(
      map(v => {
        const nodes: PageNode[] = [];
        const dict: Record<string, PageNode> = {};
        for (const x of v) {
          this.dict[x._id] = x;
          dict[x._id] = x;
        }
        for (const x of v) {
          const options = dict[x._id];
          if (!x.parent) {
            nodes.push(options);
          } else {
            if (dict.hasOwnProperty(x.parent as string)) {
              if (!dict[x.parent].hasOwnProperty('children')) {
                dict[x.parent].children = [];
              }
              dict[x.parent].children?.push(options);
            }
          }
        }
        return nodes;
      })
    );
  }

  /**
   * 获取 NzTreeNodeOptions
   */
  getNzTreeNodeOptions(): Observable<NzTreeNodeOptions[]> {
    return this.find({}, { sort: { sort: 1 } }).pipe(
      map(v => {
        const nodes: NzTreeNodeOptions[] = [];
        const dict: Record<string, NzTreeNodeOptions> = {};
        for (const x of v) {
          dict[x._id] = {
            title: `${x.name}`,
            key: x._id,
            parent: x.parent,
            icon: x.icon,
            isLeaf: true,
            expanded: true,
            selectable: false,
            selected: false
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
              dict[x.parent].children?.push(options);
              dict[x.parent].isLeaf = false;
            }
          }
        }
        return nodes;
      })
    );
  }

  /**
   * 验证内容模型命名是否存在
   * @param key
   */
  existsSchemaKey(key: string): Observable<any> {
    if (['pages', 'roles', 'departments', 'users'].includes(key)) {
      return of({ error: true, duplicated: true });
    }
    return timer(500).pipe(
      switchMap(() => this.exists({ 'schema.key': key })),
      map(v => (v ? { error: true, duplicated: v } : null))
    );
  }

  /**
   * 页面层级关系重组
   * @param id
   * @param parent
   */
  reorganization(id: string, parent: null | string): Observable<any> {
    return this.updateById(
      id,
      {
        $set: {
          parent
        }
      },
      {
        xdata: {
          parent: 'oid'
        }
      }
    );
  }

  /**
   * 内容模型字段新增
   * @param id 页面 ID
   * @param data 数据
   * @param option
   */
  addSchemaField(id: string, data: SchemaField, option?: UpdateOneByIdOption<Page>): Observable<any> {
    return this.updateById(
      id,
      {
        $push: { 'schema.fields': data }
      },
      option
    );
  }

  /**
   * 内容模型字段更新
   * @param id 页面 ID
   * @param key 字段命名
   * @param data 更新数据
   */
  updateSchemaField(id: string, key: string, data: SchemaField): Observable<any> {
    return this.updateById(
      id,
      {
        $set: {
          'schema.fields.$[i]': data
        }
      },
      { array_filters: [{ 'i.key': key }] }
    );
  }

  /**
   * 内容模型字段指定删除
   * @param id 页面 ID
   * @param key 字段命名
   */
  deleteSchemaField(id: string, key: string): Observable<any> {
    return this.updateById(id, { $pull: { 'schema.fields': { key } } });
  }

  /**
   * 内容模型字段排序
   * @param id
   * @param values
   */
  sortSchemaFields(id: string, values: number[]): Observable<any> {
    const data: Record<string, number> = {};
    values.forEach((value, index) => {
      data[`schema.fields.${value}.sort`] = index;
    });
    return forkJoin([
      this.updateById(id, { $set: data }),
      timer(200),
      this.updateById(id, { $push: { 'schema.fields': { $each: [], $sort: { sort: 1 } } } })
    ]);
  }

  /**
   * 内容模型显隐规则新增
   * @param id
   * @param data
   */
  addSchemaRule(id: string, data: any): Observable<any> {
    return this.updateById(id, { $push: { 'schema.rules': data } });
  }

  /**
   * 内容模型显隐规则更新
   * @param id
   * @param index
   * @param data
   */
  updateSchemaRule(id: string, index: number, data: any): Observable<any> {
    return this.updateById(id, { $set: { [`schema.rules.${index}`]: data } });
  }

  /**
   * 内容模型显隐规则删除
   * @param id
   * @param index
   */
  deleteSchemaRule(id: string, index: number): Observable<any> {
    return forkJoin([
      this.updateById(id, { $unset: { [`schema.rules.${index}`]: 1 } }),
      timer(200),
      this.updateById(id, { $pull: { 'schema.rules': null } })
    ]);
  }

  /**
   * 获取索引
   */
  getIndexes(id: string): Observable<any> {
    return this.http.get(this.url(id, 'indexes'));
  }

  /**
   * 创建索引
   * @param id
   * @param index
   * @param data
   */
  createIndex(id: string, index: string, data: any): Observable<any> {
    return this.http.put(this.url(id, 'indexes', index), data);
  }

  /**
   * 删除索引
   * @param id
   * @param index
   */
  deleteIndex(id: string, index: string): Observable<any> {
    return this.http.delete(this.url(id, 'indexes', index));
  }

  /**
   * 内容模型更新高级配置
   * @param id
   * @param data
   */
  updateSchemaAdvanced(id: string, data: any): Observable<any> {
    return this.updateById(id, {
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
        keys: {
          id: 1,
          name: 1,
          schema: 1
        }
      }
    );
  }

  /**
   * 更新接入页面
   * @param id
   * @param data
   */
  updateManualScope(id: string, data: any): Observable<any> {
    return this.updateById(id, {
      $set: {
        'manual.scope': data.scope
      }
    });
  }
}
