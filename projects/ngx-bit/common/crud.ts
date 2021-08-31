import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CrudOption, OrderOption, SearchOption } from '../types';
import { Lists } from './lists';
import { getQuerySchema } from './util';

export class Crud {
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
  get(condition: number | string | SearchOption[], order?: OrderOption): Observable<Record<string, any> | null> {
    const body: Record<string, any> = {};
    if (!Array.isArray(condition)) {
      body['id'] = condition;
    } else {
      body['where'] = getQuerySchema(condition);
      if (order) {
        body['order'] = order;
      }
    }
    return this.send('/get', body).pipe(map(v => (!v.error ? v.data : null)));
  }

  /**
   * 获取分页数据请求
   */
  lists(factory: Lists, refresh: boolean, persistence: boolean): Observable<Record<string, any> | null> {
    if (refresh || persistence) {
      if (refresh) {
        factory.index = 1;
      }
      factory.persistence();
    }
    return factory.getPage().pipe(
      switchMap(index => {
        factory.index = index ?? 1;
        return this.send('/lists', {
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
   * 获取原始列表数据请求
   */
  originLists(condition: SearchOption[] = [], order?: OrderOption): Observable<Array<Record<string, any>>> {
    const body: Record<string, any> = {};
    if (condition.length !== 0) {
      body['where'] = getQuerySchema(condition);
    }
    if (order) {
      body['order'] = order;
    }
    return this.send('/originLists', body).pipe(map(v => (!v.error ? v.data : [])));
  }

  /**
   * 新增数据请求
   */
  add(data: Record<string, any>): Observable<any> {
    return this.send('/add', data);
  }

  /**
   * 修改数据请求
   */
  edit(data: Record<string, any>, condition?: SearchOption[]): Observable<any> {
    data.switch = false;
    if (condition) {
      Object.assign(data, {
        where: getQuerySchema(condition)
      });
    }
    return this.send('/edit', data);
  }

  /**
   * 状态切换请求
   */
  status(data: Record<string, any>, field = 'status', extra?: Record<string, any>): Observable<any> {
    const body: Record<string, any> = {
      id: data.id,
      switch: true,
      [field]: !data[field]
    };
    if (extra) {
      Object.assign(body, extra);
    }
    return this.send('/edit', body).pipe(
      map(v => {
        if (!v.error) {
          data[field] = !data[field];
        }
        return v;
      })
    );
  }

  /**
   * 删除数据请求
   */
  delete(condition: string[] | number[] | SearchOption[]): Observable<any> {
    if (condition.length === 0) {
      throw new Error(`[ID] 或 [SearchOption] 数组不能为空`);
    }
    const body: Record<string, any> = {};
    if (typeof condition[0] === 'string' || typeof condition[0] === 'number') {
      body['id'] = condition;
    } else {
      body['where'] = getQuerySchema(condition as SearchOption[]);
    }
    return this.send('/delete', body);
  }
}
