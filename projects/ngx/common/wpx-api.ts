import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ApiOption, APIResponse, DataLists } from '../types';
import { WpxListByPage } from './wpx-list-by-page';

export class WpxApi {
  constructor(private http: HttpClient, private option: ApiOption) {}

  /**
   * 发起统一请求
   */
  send<T>(path: string, body: Record<string, any> = {}): Observable<APIResponse<T>> {
    return this.http.post(`${this.option.baseUrl}/${this.option.model}${path}`, body) as Observable<APIResponse<T>>;
  }

  /**
   * 获取单条数据请求
   */
  findOne<T>(where: Record<string, any>, sort?: Record<string, number>): Observable<T> {
    return this.send('/find_one', {
      where,
      sort
    }).pipe(map(v => (!v.code ? v.data : null))) as Observable<T>;
  }

  /**
   * 获取原始列表数据请求
   */
  find<T>(where?: Record<string, any>, sort?: Record<string, number>): Observable<T> {
    return this.send('/find', {
      where,
      sort
    }).pipe(map(v => (!v.code ? v.data : []))) as Observable<T>;
  }

  /**
   * 获取分页数据请求
   */
  findByPage<T>(lists: WpxListByPage, refresh: boolean, persistence: boolean): Observable<T> {
    if (refresh || persistence) {
      if (refresh) {
        lists.index = 1;
      }
      lists.persistence();
    }
    return lists.getPage().pipe(
      switchMap(index => {
        lists.index = index ?? 1;
        return this.send('/find_by_page', {
          page: {
            limit: lists.limit,
            index: lists.index
          },
          where: lists.search,
          sort: lists.sort
        });
      }),
      map(v => {
        const data = v.data as DataLists<T>;
        lists.totals = !v.code ? (data.total as number) : 0;
        lists.loading = false;
        lists.checked = false;
        lists.indeterminate = false;
        lists.checkedNumber = 0;
        return !v.code ? data.lists : [];
      })
    ) as Observable<T>;
  }

  /**
   * 新增数据请求
   */
  create(body: Record<string, any>): Observable<APIResponse<never>> {
    return this.send('/create', body);
  }

  /**
   * 修改数据请求
   */
  update(where: Record<string, any>, data: Record<string, any>): Observable<APIResponse<never>> {
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
  delete(where: Record<string, any>): Observable<APIResponse<never>> {
    return this.send('/delete', {
      where
    });
  }
}
