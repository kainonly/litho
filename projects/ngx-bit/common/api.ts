import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ApiOption, ApiResponse, OrderOption, SearchOption } from '../types';
import { ListByPage } from './list-by-page';
import { getQuerySchema } from './utils';

export class Api {
  constructor(private http: HttpClient, private option: ApiOption) {}

  /**
   * 获取 URL
   */
  get url(): string {
    return this.option.baseUrl + this.option.model;
  }

  /**
   * 发起统一请求
   */
  send(path: string, body: Record<string, unknown> = {}): Observable<unknown> {
    return this.http.post(this.url + path, {
      body
    });
  }

  /**
   * 获取单条数据请求
   */
  get(condition: number | string | SearchOption[], order?: OrderOption): Observable<Record<string, unknown> | null> {
    const body: Record<string, unknown> = {};
    if (!Array.isArray(condition)) {
      body['id'] = condition;
    } else {
      body['where'] = getQuerySchema(condition);
      if (order) {
        body['order'] = order;
      }
    }
    return this.send('/get', body).pipe(
      map(v => {
        const response = v as ApiResponse;
        return !response.error ? response.data : null;
      })
    );
  }

  /**
   * 获取分页数据请求
   */
  lists(factory: ListByPage, refresh: boolean, persistence: boolean): Observable<Record<string, unknown> | null> {
    if (refresh || persistence) {
      if (refresh) {
        factory.index = 1;
      }
      factory.persistence();
    }
    return factory.getPage().pipe(
      switchMap(index => {
        factory.index = index ? (index as number) : 1;
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
        const response = v as ApiResponse;
        factory.totals = !response.error ? (response.data.total as number) : 0;
        factory.loading = false;
        factory.checked = false;
        factory.indeterminate = false;
        factory.batch = false;
        factory.checkedNumber = 0;
        return !response.error ? (response.data.lists as Record<string, unknown>) : null;
      })
    );
  }

  /**
   * 获取原始列表数据请求
   */
  originLists(condition: SearchOption[] = [], order?: OrderOption): Observable<Record<string, unknown> | null> {
    const body: Record<string, unknown> = {};
    if (condition.length !== 0) {
      body['where'] = getQuerySchema(condition);
    }
    if (order) {
      body['order'] = order;
    }
    return this.send('/originLists', body).pipe(
      map(v => {
        const response = v as ApiResponse;
        return !response.error ? response.data : null;
      })
    );
  }

  /**
   * 新增数据请求
   */
  add(data: Record<string, unknown>): Observable<unknown> {
    return this.send('/add', data);
  }

  /**
   * 修改数据请求
   */
  edit(data: Record<string, unknown>, condition?: SearchOption[]): Observable<unknown> {
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
  status(data: Record<string, unknown>, field = 'status', extra?: Record<string, unknown>): Observable<unknown> {
    const body: Record<string, unknown> = {
      id: data.id,
      switch: true,
      [field]: !data[field]
    };
    if (extra) {
      Object.assign(body, extra);
    }
    return this.send('/edit', body).pipe(
      map(v => {
        const response = v as ApiResponse;
        if (!response.error) {
          data[field] = !data[field];
        }
        return response;
      })
    );
  }

  /**
   * 删除数据请求
   */
  delete(condition: string[] | number[] | SearchOption[]): Observable<unknown> {
    if (condition.length === 0) {
      throw new Error(`[ID] 或 [SearchOption] 数组不能为空`);
    }
    const body: Record<string, unknown> = {};
    if (typeof condition[0] === 'string' || typeof condition[0] === 'number') {
      body['id'] = condition;
    } else {
      body['where'] = getQuerySchema(condition as SearchOption[]);
    }
    return this.send('/delete', body);
  }
}
