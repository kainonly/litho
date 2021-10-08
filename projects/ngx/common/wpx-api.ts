import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ApiOption } from '../types';
import { WpxListByPage } from './wpx-list-by-page';

export class WpxApi {
  constructor(private http: HttpClient, private option: ApiOption) {}

  /**
   * 发起统一请求
   */
  send(path: string, body: Record<string, any> = {}): Observable<any> {
    return this.http.post(`${this.option.baseUrl}/${this.option.model}${path}`, body);
  }

  /**
   * 获取单条数据请求
   */
  findOne(where: Record<string, any>, sort?: Record<string, number>): Observable<Record<string, any> | null> {
    return this.send('/find_one', {
      where,
      sort
    }).pipe(map(v => (!v.error ? v.data : null)));
  }

  /**
   * 获取原始列表数据请求
   */
  find(where?: Record<string, any>, sort?: Record<string, number>): Observable<Array<Record<string, any>>> {
    return this.send('/find', {
      where,
      sort
    }).pipe(map(v => (!v.error ? v.data : [])));
  }

  /**
   * 获取分页数据请求
   */
  findByPage(list: WpxListByPage, refresh: boolean, persistence: boolean): Observable<Record<string, any> | null> {
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
        list.totals = !v.error ? v.data.total : 0;
        list.loading = false;
        list.checked = false;
        list.indeterminate = false;
        list.batch = false;
        list.checkedNumber = 0;
        return !v.error ? v.data.lists : null;
      })
    );
  }

  /**
   * 新增数据请求
   */
  create(body: Record<string, any>): Observable<any> {
    return this.send('/create', body);
  }

  /**
   * 修改数据请求
   */
  update(where: Record<string, any>, data: Record<string, any>): Observable<any> {
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
  delete(where: Record<string, any>): Observable<any> {
    return this.send('/delete', {
      where
    });
  }
}
