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
  findByPage<T>(list: WpxListByPage, refresh: boolean, persistence: boolean): Observable<T> {
    if (refresh || persistence) {
      if (refresh) {
        list.index = 1;
      }
      list.persistence();
    }
    return list.getPage().pipe(
      switchMap(index => {
        list.index = index ?? 1;
        return this.send('/find_by_page', {
          page: {
            limit: list.limit,
            index: list.index
          },
          where: list.search,
          order: list.sort
        });
      }),
      map(v => {
        const data = v.data as DataLists<T>;
        list.totals = !v.code ? (data.total as number) : 0;
        list.loading = false;
        list.checked = false;
        list.indeterminate = false;
        list.batch = false;
        list.checkedNumber = 0;
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
