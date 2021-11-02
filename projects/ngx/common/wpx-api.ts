import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { APIOption, APIResponse, CollectionType, PageData } from '../types';
import { WpxCollection } from './wpx-collection';

export class WpxApi {
  private http!: HttpClient;

  constructor(private option: APIOption) {
    this.http = option.http;
  }

  /**
   * 发起统一请求
   */
  send<T>(path: string, body: Record<string, unknown> = {}): Observable<APIResponse<T>> {
    return this.http.post(`${this.option.baseUrl}/${this.option.model}${path}`, body) as Observable<APIResponse<T>>;
  }

  /**
   * 获取单条数据请求
   */
  findOne<T>(where: Record<string, unknown>, sort?: Record<string, number>): Observable<T> {
    return this.send('/find_one', {
      where,
      sort
    }).pipe(map(v => (!v.code ? v.data : null))) as Observable<T>;
  }

  /**
   * 获取原始列表数据请求
   */
  find<T>(where?: Record<string, unknown>, sort?: Record<string, number>): Observable<T[]> {
    return this.send('/find', {
      where,
      sort
    }).pipe(map(v => (!v.code ? v.data : []))) as Observable<T[]>;
  }

  /**
   * 获取分页数据请求
   */
  findByPage<T, CT extends CollectionType>(coll: WpxCollection<CT>): Observable<PageData<T>> {
    return this.send('/find_by_page', {
      page: {
        limit: coll.limit,
        index: coll.index
      }
    }).pipe(
      map(v => {
        if (!v.code) {
        }
        return v.data;
      })
    ) as Observable<PageData<T>>;
  }

  /**
   * 新增数据请求
   */
  create(body: Record<string, unknown>): Observable<APIResponse<never>> {
    return this.send('/create', body);
  }

  /**
   * 修改数据请求
   */
  update(where: Record<string, unknown>, data: Record<string, unknown>): Observable<APIResponse<never>> {
    return this.send('/update', {
      where,
      update: {
        $set: data
      }
    });
  }

  /**
   * 删除数据请求
   */
  delete(where: Record<string, unknown>): Observable<APIResponse<never>> {
    return this.send('/delete', {
      where
    });
  }
}
