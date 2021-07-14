import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BitCurdService } from './bit-curd.service';
import { CurdInterface, ListsOption, OrderOption, SearchOption } from './types';
import { ListByPage } from './utils/list-by-page';

@Injectable({ providedIn: 'root' })
export class BitCurdCommonService extends BitCurdService implements CurdInterface {
  /**
   * 获取单条数据请求
   * Get a single data request
   */
  get(model: string, condition: number | string | SearchOption[], order?: OrderOption, path?: string): Observable<any> {
    let http: Observable<any>;
    const url = path || this.curd.get;
    if (Array.isArray(condition)) {
      http = this.http.req(model + url, {
        where: this.getQuerySchema(condition),
        order
      });
    } else {
      http = this.http.req(model + url, {
        id: condition
      });
    }
    return http.pipe(map(res => (!res.error ? res.data : null)));
  }

  /**
   * 获取分页数据请求
   * Get pagination data request
   */
  lists(model: string, factory: ListByPage, option: ListsOption, path?: string): Observable<any> {
    const url = path || this.curd.lists;
    if (option.refresh || option.persistence) {
      if (option.refresh) {
        factory.index = 1;
      }
      factory.persistence();
    }
    return factory.getPage().pipe(
      switchMap(index => {
        factory.index = index ? index : 1;
        return this.http.req(model + url, {
          page: {
            limit: factory.limit,
            index: factory.index
          },
          where: factory.toQuerySchema(),
          order: factory.order
        });
      }),
      map(res => {
        factory.totals = !res.error ? res.data.total : 0;
        factory.loading = false;
        factory.checked = false;
        factory.indeterminate = false;
        factory.batch = false;
        factory.checkedNumber = 0;
        return !res.error ? res.data.lists : null;
      })
    );
  }

  /**
   * 获取原始列表数据请求
   * Get original list data request
   */
  originLists(model: string, condition: SearchOption[] = [], order?: OrderOption, path?: string): Observable<any> {
    const url = path || this.curd.originLists;
    return this.http
      .req(model + url, {
        where: this.getQuerySchema(condition),
        order
      })
      .pipe(map(res => (!res.error ? res.data : undefined)));
  }

  /**
   * 新增数据请求
   * New data request
   */
  add(model: string, data: Record<string, any>, path?: string): Observable<any> {
    const url = path || this.curd.add;
    return this.http.req(model + url, data);
  }

  /**
   * 修改数据请求
   * Modify data request
   */
  edit(model: string, data: Record<string, any>, condition?: SearchOption[], path?: string): Observable<any> {
    const url = path || this.curd.edit;
    data.switch = false;
    return !condition
      ? this.http.req(model + url, data)
      : this.http.req(
          model + url,
          Object.assign(data, {
            where: this.getQuerySchema(condition)
          })
        );
  }

  /**
   * 状态切换请求
   * State switch request
   */
  status(
    model: string,
    data: Record<string, any>,
    field = 'status',
    extra?: Record<string, any>,
    path?: string
  ): Observable<any> {
    const url = path || this.curd.status;
    const body = {
      id: data.id,
      switch: true,
      [field]: !data[field]
    };
    if (extra !== undefined) {
      Object.assign(body, extra);
    }
    return this.http.req(model + url, body).pipe(
      map(res => {
        if (!res.error) {
          data[field] = !data[field];
        }
        return res;
      })
    );
  }

  /**
   * 删除数据请求
   * Delete data request
   */
  delete(model: string, id?: string[] | number[], condition?: SearchOption[], path?: string): Observable<any> {
    const url = path || this.curd.delete;
    if (id !== undefined) {
      return this.http.req(model + url, {
        id
      });
    }
    if (condition !== undefined) {
      return this.http.req(model + url, {
        where: this.getQuerySchema(condition)
      });
    }
    return of(false);
  }
}
