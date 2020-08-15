import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { BitConfigService } from './bit-config.service';
import { ListByPage } from '../factory/list-by-page';
import { getQuerySchema } from '../operates/get-query-schema';
import { ListsOption, SearchOption } from '../types';

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
    const request = this.http.request(
      method,
      this.config.url.api + this.config.api.namespace + '/' + url,
      {
        body,
        withCredentials: this.config.api.withCredentials
      }
    );
    const interceptor = this.config.getHttpInterceptor();
    if (interceptor) {
      request.pipe(interceptor);
    }
    return request;
  }

  /**
   * Get Request
   */
  get(model: string, condition: number | string | SearchOption[]): Observable<any> {
    let http: Observable<any>;
    if (Array.isArray(condition)) {
      http = this.req(model + '/get', {
        where: getQuerySchema(condition)
      });
    } else {
      http = this.req(model + '/get', {
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
  lists(model: string, factory: ListByPage, option: ListsOption): Observable<any> {
    if (option.refresh || option.persistence) {
      if (option.refresh) {
        factory.index = 1;
      }
      factory.persistence();
    }
    return factory.getPage().pipe(
      switchMap(index => {
        factory.index = index ? index : 1;
        return this.req(model + '/lists', {
          page: {
            limit: factory.limit,
            index: factory.index
          },
          where: factory.toQuerySchema()
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
  originLists(model: string, condition: SearchOption[] = []): Observable<any> {
    return this.req(model + '/originLists', {
      where: getQuerySchema(condition)
    }).pipe(
      map(res => !res.error ? res.data : null)
    );
  }

  /**
   * Add Request
   */
  add(model: string, data: any): Observable<any> {
    return this.req(model + '/add', data);
  }

  /**
   * Edit Request
   */
  edit(model: string, data: any, condition?: SearchOption[]): Observable<any> {
    data.switch = false;
    return !condition ?
      this.req(model + '/edit', data) :
      this.req(model + '/edit', Object.assign(data, {
          where: getQuerySchema(condition)
        })
      );
  }

  /**
   * Status Request
   */
  status(model: string, data: any, field = 'status', extra?: any): Observable<any> {
    const body = {
      id: data.id,
      switch: true,
      [field]: !data[field]
    };
    if (extra !== undefined) {
      Object.assign(body, extra);
    }
    return this.req(model + '/edit', body).pipe(
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
  delete(model: string, id?: any[], condition?: SearchOption[]): Observable<any> {
    if (id !== undefined) {
      return this.req(model + '/delete', {
        id
      });
    }
    if (condition !== undefined) {
      return this.req(model + '/delete', {
        where: getQuerySchema(condition)
      });
    }
    return of(false);
  }
}
