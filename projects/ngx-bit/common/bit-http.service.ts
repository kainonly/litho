import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ListByPage } from 'ngx-bit/factory';
import { getQuerySchema } from 'ngx-bit/operates';
import { BitConfigService } from './bit-config.service';
import { ListsOption, OrderOption, SearchOption } from '../typings';

@Injectable()
export class BitHttpService {
  constructor(
    private http: HttpClient,
    private config: BitConfigService
  ) {
  }

  /**
   * HttpClient
   */
  req(url: string, body: any = {}, method = 'post'): Observable<any> {
    let httpClient = this.http.request(
      method,
      this.config.url.api + this.config.api.namespace + '/' + url,
      {
        body,
        withCredentials: this.config.api.withCredentials
      }
    );
    const interceptor = this.config.getHttpInterceptor();
    if (interceptor) {
      httpClient = httpClient.pipe(interceptor);
    }
    return httpClient;
  }

  /**
   * Get Request
   */
  get(model: string, condition: number | string | SearchOption[], order?: OrderOption, path?: string): Observable<any> {
    let http: Observable<any>;
    const url = path ? path : this.config.curd.get;
    if (Array.isArray(condition)) {
      http = this.req(model + url, {
        where: getQuerySchema(condition),
        order
      });
    } else {
      http = this.req(model + url, {
        id: condition
      });
    }
    return http.pipe(
      map(res => !res.error ? res.data : null)
    );
  }

  /**
   * Lists Request
   */
  lists(model: string, factory: ListByPage, option: ListsOption, path?: string): Observable<any> {
    const url = path ? path : this.config.curd.lists;
    if (option.refresh || option.persistence) {
      if (option.refresh) {
        factory.index = 1;
      }
      factory.persistence();
    }
    return factory.getPage().pipe(
      switchMap(index => {
        factory.index = index ? index : 1;
        return this.req(model + url, {
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
   * OriginLists Request
   */
  originLists(model: string, condition: SearchOption[] = [], order?: OrderOption, path?: string): Observable<any> {
    const url = path ? path : this.config.curd.originLists;
    return this.req(model + url, {
      where: getQuerySchema(condition),
      order
    }).pipe(
      map(res => !res.error ? res.data : null)
    );
  }

  /**
   * Add Request
   */
  add(model: string, data: any, path?: string): Observable<any> {
    const url = path ? path : this.config.curd.add;
    return this.req(model + url, data);
  }

  /**
   * Edit Request
   */
  edit(model: string, data: any, condition?: SearchOption[], path?: string): Observable<any> {
    const url = path ? path : this.config.curd.edit;
    data.switch = false;
    return !condition ?
      this.req(model + url, data) :
      this.req(model + url, Object.assign(data, {
          where: getQuerySchema(condition)
        })
      );
  }

  /**
   * Status Request
   */
  status(model: string, data: any, field = 'status', extra?: any, path?: string): Observable<any> {
    const url = path ? path : this.config.curd.status;
    const body = {
      id: data.id,
      switch: true,
      [field]: !data[field]
    };
    if (extra !== undefined) {
      Object.assign(body, extra);
    }
    return this.req(model + url, body).pipe(
      map((res) => {
        if (!res.error) {
          data[field] = !data[field];
        }
        return res;
      })
    );
  }

  /**
   * Delete Request
   */
  delete(model: string, id?: any[], condition?: SearchOption[], path?: string): Observable<any> {
    const url = path ? path : this.config.curd.delete;
    if (id !== undefined) {
      return this.req(model + url, {
        id
      });
    }
    if (condition !== undefined) {
      return this.req(model + url, {
        where: getQuerySchema(condition)
      });
    }
    return of(false);
  }
}
