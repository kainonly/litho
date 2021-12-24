import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CollectionValue } from '../types';
import { Collection } from './collection';
import { getSearchValues, toSortValues } from './helper';

@Injectable()
export class Api<T> {
  private static __resource__: string;

  static resource(name: string): typeof Api {
    this.__resource__ = name;
    return this;
  }

  constructor(protected http: HttpClient) {}

  /**
   * URL生成
   */
  url(fragments: string[] = []): string {
    return [Api.__resource__, ...fragments].join('/');
  }

  /**
   * 筛选获取单个文档
   */
  findOne(where: Record<keyof T, any>): Observable<T> {
    if (Object.keys(where).length === 0) {
      throw new Error('the [where] cannot be empty');
    }
    return this.http.get(this.url(), {
      params: new HttpParams().set('where', JSON.stringify(where)).set('single', true)
    }) as Observable<T>;
  }

  /**
   * ID获取单个文档
   */
  findOneById(id: string): Observable<T> {
    if (!id) {
      throw new Error('the [id] cannot be empty');
    }
    return this.http.get(this.url([id])) as Observable<T>;
  }

  /**
   * 筛选获取文档
   */
  find(where?: Record<keyof T, any>, sort?: Record<string, 1 | -1>): Observable<T[]> {
    let params = new HttpParams();
    if (where) {
      params = params.set('where', JSON.stringify(where));
    }
    if (sort) {
      for (let [k, v] of Object.entries(sort)) {
        params = params.append('sort', `${k}.${v}`);
      }
    }
    return this.http.get(this.url(), {
      params
    }) as Observable<T[]>;
  }

  /**
   * ID集合获取文档
   */
  findById(ids: string[], sort?: Record<string, 1 | -1>): Observable<T[]> {
    if (ids.length === 0) {
      throw new Error('the [ids] cannot be empty');
    }
    let params = new HttpParams();
    for (const id of ids) {
      params = params.append('id', id);
    }
    if (sort) {
      for (let [k, v] of Object.entries(sort)) {
        params = params.append('sort', `${k}.${v}`);
      }
    }
    return this.http.get(this.url(), { params }) as Observable<T[]>;
  }

  /**
   * 获取分页文档
   */
  findByPage<T extends CollectionValue>(coll: Collection<T>): Observable<T[]> {
    let params = new HttpParams();
    const where = !coll.searchText ? getSearchValues(coll.searchOptions) : { $text: { $search: coll.searchText } };
    if (Object.keys(where).length !== 0) {
      params = params.set('where', JSON.stringify(where));
    }
    const sort = toSortValues(coll.sortOptions);
    if (sort.length !== 0) {
      for (let [k, v] of Object.entries(sort)) {
        params = params.append('sort', `${k}.${v}`);
      }
    }
    return this.http
      .get(this.url(), {
        observe: 'response',
        headers: {
          'x-page-size': coll.pageSize.toString(),
          'x-page': coll.pageIndex.toString()
        },
        params
      })
      .pipe(
        map(res => {
          coll.setTotal(parseInt(res.headers.get('x-page-total')!, 0));
          return res.body;
        })
      ) as Observable<T[]>;
  }

  /**
   * 创建文档
   */
  create(body: Record<string, any>): Observable<any> {
    return this.http.post(this.url(), body);
  }

  /**
   * 更新筛选文档
   */
  update(where: Record<keyof T, any>, data: Record<string, any>, multiple = true): Observable<any> {
    if (Object.keys(where).length === 0) {
      throw new Error('the [where] cannot be empty');
    }
    return this.http.patch(
      this.url(),
      {
        update: {
          $set: data
        }
      },
      {
        params: new HttpParams().set('where', JSON.stringify(where)).set('multiple', multiple)
      }
    );
  }

  /**
   * 更新
   */
  updateOne(where: Record<keyof T, any>, data: Record<string, any>): Observable<any> {
    return this.update(where, data, false);
  }

  /**
   * 更新ID文档
   */
  updateOneById(id: string, data: Record<string, any>): Observable<any> {
    if (!id) {
      throw new Error('the [id] cannot be empty');
    }
    return this.http.patch(this.url([id]), {
      update: {
        $set: data
      }
    });
  }

  /**
   * 删除文档
   */
  delete(id: string): Observable<any> {
    if (!id) {
      throw new Error('the [id] cannot be empty');
    }
    return this.http.delete(this.url([id]));
  }
}
