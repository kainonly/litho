import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CrudOption, OrderOption, SearchOption } from '../types';
import { Lists } from './lists';
import { getQuerySchema } from './util';

export class Api {
  constructor(private http: HttpClient, private option: CrudOption) {}

  /**
   * 获取 URL
   */
  get url(): string {
    return this.option.baseUrl + this.option.model;
  }

  /**
   * 发起统一请求
   */
  send(path: string, body: Record<string, any> = {}): Observable<any> {
    return this.http.post(this.url + path, body);
  }

  /**
   * 获取单条数据请求
   */
  findOne(condition: SearchOption[], order?: OrderOption): Observable<Record<string, any> | null> {
    return this.send('/r/find/one', {
      where: getQuerySchema(condition),
      order
    }).pipe(map(v => (!v.error ? v.data : null)));
  }

  /**
   * 获取原始列表数据请求
   */
  findMany(condition: SearchOption[] = [], order?: OrderOption): Observable<Array<Record<string, any>>> {
    return this.send('/r/find/many', {
      where: getQuerySchema(condition),
      order
    }).pipe(map(v => (!v.error ? v.data : [])));
  }

  /**
   * 获取分页数据请求
   */
  findPage(factory: Lists, refresh: boolean, persistence: boolean): Observable<Record<string, any> | null> {
    if (refresh || persistence) {
      if (refresh) {
        factory.index = 1;
      }
      factory.persistence();
    }
    return factory.getPage().pipe(
      switchMap(index => {
        factory.index = index ?? 1;
        return this.send('/r/find/page', {
          page: {
            limit: factory.limit,
            index: factory.index
          },
          where: getQuerySchema(factory.toQuery()),
          order: factory.order
        });
      }),
      map(v => {
        factory.totals = !v.error ? v.data.total : 0;
        factory.loading = false;
        factory.checked = false;
        factory.indeterminate = false;
        factory.batch = false;
        factory.checkedNumber = 0;
        return !v.error ? v.data.lists : null;
      })
    );
  }

  /**
   * 新增数据请求
   */
  create(data: Record<string, any>): Observable<any> {
    return this.send('/w/create', data);
  }

  /**
   * 修改数据请求
   */
  update(condition: SearchOption[], data: Record<string, any>): Observable<any> {
    return this.send('/w/update', {
      where: getQuerySchema(condition),
      updates: data
    });
  }

  /**
   * 删除数据请求
   */
  delete(condition: SearchOption[]): Observable<any> {
    return this.send('/w/delete', {
      where: getQuerySchema(condition)
    });
  }
}
