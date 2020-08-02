import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ConfigService } from './config.service';
import { ListByPage } from '../factory/list-by-page';
import { getQuerySchema } from '../operates/get-query-schema';
import { SearchOption } from '../types/search-option';

@Injectable()
export class HttpService {
  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
  }

  /**
   * HttpClient
   */
  req(url: string, body: any = {}, method = 'post'): Observable<any> {
    const httpClient = this.http.request(
      method,
      this.config.originUrl + this.config.namespace + '/' + url,
      {
        body,
        withCredentials: this.config.withCredentials
      }
    );
    return !this.config.httpInterceptor ? httpClient : httpClient.pipe(
      switchMap(res => this.config.interceptor(res))
    );
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
  lists(model: string, factory: ListByPage, refresh = false): Observable<any> {
    if (refresh === true) {
      factory.index = 1;
      factory.persistence();
    }
    console.log(factory.index);
    const http = this.req(model + '/lists', {
      page: {
        limit: factory.limit,
        index: factory.index
      },
      where: factory.toQuerySchema()
    }).pipe(
      map((res) => {
        factory.totals = !res.error ? res.data.total : 0;
        factory.loading = false;
        factory.checked = false;
        factory.indeterminate = false;
        factory.batch = false;
        factory.checkedNumber = 0;
        return res;
      })
    );
    return http.pipe(
      map(res => !res.error ? res.data.lists : null)
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
    if (!id) {
      return this.req(model + '/delete', {
        id
      });
    }
    if (!condition) {
      return this.req(model + '/delete', {
        where: getQuerySchema(condition)
      });
    }
    return of(false);
  }
}
