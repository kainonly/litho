import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {ConfigService} from './config.service';
import {BitService} from './bit.service';
import {ConvertToWhere} from '../lib.common';
import {SearchOptions} from '../lib.types';

@Injectable()
export class HttpService {
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private bit: BitService
  ) {
  }

  /**
   * HttpClient
   */
  req(url: string, body: any = {}, method = 'post'): Observable<any> {
    const httpClient = this.http.request(method, this.config.originUrl + this.config.namespace + '/' + url, {
      body,
      withCredentials: this.config.withCredentials
    });
    return !this.config.httpInterceptor ? httpClient : httpClient.pipe(
      switchMap(res => this.config.interceptor(res))
    );
  }

  /**
   * Get Request
   */
  get(model: string, condition: number | string | SearchOptions[], origin = false): Observable<any> {
    const http = Array.isArray(condition) ? this.req(model + '/get', {
      where: ConvertToWhere(condition)
    }) : this.req(model + '/get', {
      id: condition
    });
    return origin ? http : http.pipe(
      map(res => !res.error ? res.data : null)
    );
  }

  /**
   * Lists Request
   */
  lists(model: string, condition: SearchOptions[] = [], refresh = false, limit = 0, origin = false): Observable<any> {
    const where = ConvertToWhere(condition);
    if (refresh === true) {
      this.bit.listsPageIndex = 1;
    }
    const http = this.req(model + '/lists', {
      page: {
        limit: !limit ? this.bit.pageLimit : limit,
        index: this.bit.listsPageIndex
      },
      where,
    }).pipe(
      map((res) => {
        this.bit.listsTotals = !res.error ? res.data.total : 0;
        this.bit.listsLoading = false;
        this.bit.listsAllChecked = false;
        this.bit.listsIndeterminate = false;
        this.bit.listsDisabledAction = true;
        this.bit.listsCheckedNumber = 0;
        return res;
      })
    );
    return origin ? http : http.pipe(
      map(res => !res.error ? res.data.lists : null)
    );
  }

  /**
   * OriginLists Request
   */
  originLists(model: string, condition: SearchOptions[] = [], special = false): Observable<any> {
    const where = special ? condition : ConvertToWhere(condition);
    const http = this.req(model + '/originLists', {
      where
    });
    return special ? http : http.pipe(
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
  edit(model: string, data: any, condition?: SearchOptions[]): Observable<any> {
    Reflect.set(data, 'switch', false);
    return !condition ?
      this.req(model + '/edit', data) :
      this.req(model + '/edit', Object.assign(data, {
          where: ConvertToWhere(condition)
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
      [field]: !data[field],
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
  delete(model: string, id?: number[] | string[], condition?: SearchOptions[]): Observable<any> {
    if (id !== undefined) {
      return this.req(model + '/delete', {
        id
      });
    }
    if (condition !== undefined) {
      const where = ConvertToWhere(condition);
      return this.req(model + '/delete', {
        where
      });
    }
    return of(false);
  }
}
