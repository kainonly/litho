import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnyDto, CreateResult, DeleteResult, UpdateDto, UpdateResult, Where } from '../types';
import { Dataset } from './dataset';
import { getSearchValues, toSortValues } from './helper';

@Injectable()
export class Api<T> {
  private static __resource__: string;

  /**
   * 设定资源
   */
  static resource(name: string): typeof Api {
    this.__resource__ = name;
    return this;
  }

  constructor(protected http: HttpClient) {}

  /**
   * URL生成
   */
  protected url(...fragments: string[]): string {
    return [Api.__resource__, ...fragments].join('/');
  }

  /**
   * 获取单个文档（筛选）
   */
  findOne(where: Where<T>): Observable<AnyDto<T>> {
    if (Object.keys(where).length === 0) {
      throw new Error('the [where] cannot be empty');
    }
    return this.http.get(this.url(), {
      params: new HttpParams().set('where', JSON.stringify(where)).set('single', true)
    }) as Observable<AnyDto<T>>;
  }

  /**
   * 获取单个文档（ID）
   */
  findOneById(id: string): Observable<AnyDto<T>> {
    if (!id) {
      throw new Error('the [id] cannot be empty');
    }
    return this.http.get(this.url(id)) as Observable<AnyDto<T>>;
  }

  /**
   * 获取多个文档（筛选）
   */
  find(where?: Where<T>, sort?: Record<string, 1 | -1>): Observable<Array<AnyDto<T>>> {
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
    }) as Observable<Array<AnyDto<T>>>;
  }

  /**
   * 获取多个文档（ID集合）
   */
  findById(ids: string[], sort?: Record<string, 1 | -1>): Observable<Array<AnyDto<T>>> {
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
    return this.http.get(this.url(), { params }) as Observable<Array<AnyDto<T>>>;
  }

  /**
   * 获取分页文档
   */
  findByPage(coll: Dataset<AnyDto<T>>): Observable<Array<AnyDto<T>>> {
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
      ) as Observable<Array<AnyDto<T>>>;
  }

  /**
   * 创建文档
   */
  create(body: T): Observable<CreateResult> {
    return this.http.post(this.url(), body) as Observable<CreateResult>;
  }

  /**
   * 更新多个文档（筛选）
   */
  update(where: Where<T>, body: UpdateDto<T>, multiple = true): Observable<UpdateResult> {
    if (Object.keys(where).length === 0) {
      throw new Error('the [where] cannot be empty');
    }
    return this.http.patch(this.url(), body, {
      params: new HttpParams().set('where', JSON.stringify(where)).set('multiple', multiple)
    }) as Observable<UpdateResult>;
  }

  /**
   * 更新多个文档（ID）
   */
  updateById(ids: string[], body: UpdateDto<T>): Observable<UpdateResult> {
    if (ids.length === 0) {
      throw new Error('the [ids] cannot be empty');
    }
    let params = new HttpParams();
    for (const id of ids) {
      params = params.append('id', id);
    }
    return this.http.patch(this.url(), body, { params }) as Observable<UpdateResult>;
  }

  /**
   * 更新单个文档（筛选）
   */
  updateOne(where: Where<T>, body: UpdateDto<T>): Observable<UpdateResult> {
    return this.update(where, body, false);
  }

  /**
   * 更新单个文档（ID）
   */
  updateOneById(id: string, body: UpdateDto<T>): Observable<UpdateResult> {
    if (!id) {
      throw new Error('the [id] cannot be empty');
    }
    return this.http.patch(this.url(id), body) as Observable<UpdateResult>;
  }

  /**
   * 替换单个文档
   */
  replace(id: string, data: T): Observable<UpdateResult> {
    if (!id) {
      throw new Error('the [id] cannot be empty');
    }
    return this.http.put(this.url(id), data) as Observable<UpdateResult>;
  }

  /**
   * 删除文档
   */
  delete(id: string): Observable<DeleteResult> {
    if (!id) {
      throw new Error('the [id] cannot be empty');
    }
    return this.http.delete(this.url(id)) as Observable<DeleteResult>;
  }
}
