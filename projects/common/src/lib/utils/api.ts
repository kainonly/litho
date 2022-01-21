import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnyDto, CreateDto, ReplaceDto, UpdateDto, Where } from '../types';
import { Dataset } from './dataset';
import { toSortValues } from './helper';

@Injectable()
export class Api<T> {
  /**
   * 模型名称
   * @protected
   */
  protected model: string = '';

  constructor(protected http: HttpClient) {}

  /**
   * URL生成
   * @param fragments
   * @protected
   */
  protected url(...fragments: string[]): string {
    return ['api', this.model, ...fragments].join('/');
  }

  /**
   * 创建文档
   * @param body
   */
  create(body: CreateDto<T>): Observable<any> {
    return this.http.post(this.url(), body);
  }

  /**
   * 获取单个文档（筛选）
   * @param where
   */
  findOne(where: Where<T>): Observable<AnyDto<T>> {
    if (Object.keys(where).length === 0) {
      throw new Error('筛选条件不能为空');
    }
    return this.http.get(this.url(), {
      params: new HttpParams().set('where', JSON.stringify(where)).set('single', true)
    }) as Observable<AnyDto<T>>;
  }

  /**
   * 获取单个文档（ID）
   * @param id
   */
  findOneById(id: string): Observable<AnyDto<T>> {
    if (!id) {
      throw new Error('文档 ID 不能为空');
    }
    return this.http.get<AnyDto<T>>(this.url(id));
  }

  /**
   * 获取多个文档（筛选）
   * @param where
   * @param sort
   */
  find(where?: Where<T>, sort?: Record<string, 1 | -1>): Observable<Array<AnyDto<T>>> {
    let params = new HttpParams();
    if (where) {
      params = params.set('where', JSON.stringify(where));
    }
    if (sort) {
      for (const v of Object.values(sort)) {
        params = params.append('sort', v);
      }
    }
    return this.http.get<Array<AnyDto<T>>>(this.url(), {
      params
    });
  }

  /**
   * 获取多个文档（ID集合）
   * @param ids ID数组
   * @param sort
   */
  findById(ids: string[], sort?: Record<string, 1 | -1>): Observable<Array<AnyDto<T>>> {
    if (ids.length === 0) {
      throw new Error('文档 ID 数组不能为空');
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
    return this.http.get<Array<AnyDto<T>>>(this.url(), { params });
  }

  /**
   * 获取分页文档
   * @param ds 数据源对象
   */
  findByPage(ds: Dataset<AnyDto<T>>): Observable<Array<AnyDto<T>>> {
    let params = new HttpParams();
    if (Object.keys(ds.where).length !== 0) {
      params = params.set('where', JSON.stringify(ds.where));
    }
    if (Object.keys(ds.sort).length !== 0) {
      const sort = toSortValues(ds.sort);
      for (const v of Object.values(sort)) {
        params = params.append('sort', v);
      }
    }
    return this.http
      .get<Array<AnyDto<T>>>(this.url(), {
        observe: 'response',
        headers: {
          'x-page-size': ds.pageSize.toString(),
          'x-page': ds.pageIndex.toString()
        },
        params
      })
      .pipe(
        map(res => {
          ds.setTotal(parseInt(res.headers.get('x-page-total')!));
          return res.body ?? [];
        })
      );
  }

  /**
   * 更新多个文档（筛选）
   * @param where
   * @param body
   * @param multiple
   */
  update(where: Where<T>, body: UpdateDto<T>, multiple = true): Observable<any> {
    if (Object.keys(where).length === 0) {
      throw new Error('筛选条件不能为空');
    }
    return this.http.patch(this.url(), body, {
      params: new HttpParams().set('where', JSON.stringify(where)).set('multiple', multiple)
    });
  }

  /**
   * 更新多个文档（ID）
   * @param ids
   * @param body
   */
  updateById(ids: string[], body: UpdateDto<T>): Observable<any> {
    if (ids.length === 0) {
      throw new Error('文档 ID 数组不能为空');
    }
    let params = new HttpParams();
    for (const id of ids) {
      params = params.append('id', id);
    }
    return this.http.patch(this.url(), body, { params });
  }

  /**
   * 更新单个文档（筛选）
   * @param where
   * @param body
   */
  updateOne(where: Where<T>, body: UpdateDto<T>): Observable<any> {
    return this.update(where, body, false);
  }

  /**
   * 更新单个文档（ID）
   * @param id
   * @param body
   */
  updateOneById(id: string, body: UpdateDto<T>): Observable<any> {
    if (!id) {
      throw new Error('文档 ID 不能为空');
    }
    return this.http.patch(this.url(id), body);
  }

  /**
   * 替换单个文档
   * @param id
   * @param body
   */
  replace(id: string, body: ReplaceDto<T>): Observable<any> {
    if (!id) {
      throw new Error('文档 ID 不能为空');
    }
    return this.http.put(this.url(id), body);
  }

  /**
   *删除文档
   * @param id
   */
  delete(id: string): Observable<any> {
    if (!id) {
      throw new Error('文档 ID 不能为空');
    }
    return this.http.delete(this.url(id));
  }
}
