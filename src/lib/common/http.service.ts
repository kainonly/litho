import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {BitService} from './bit.service';

@Injectable()
export class HttpService {
  /**
   * Convert to where
   */
  static toWhere(condition: any[]) {
    const where = [];
    for (const x of condition) {
      if (!(x.value === '' || x.value === 0 || !x.value)) {
        where.push([x.field, x.op, (x.op === 'like' ? `%${x.value}%` : x.value)]);
      }
    }
    return where;
  }

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
  get(model: string, condition: any, special = false): Observable<any> {
    const http = condition.hasOwnProperty('id') ? this.req(model + '/get', condition) : this.req(model + '/get', {
      where: condition
    });
    return special ? http : http.pipe(
      map(res => !res.error ? res.data : {})
    );
  }

  /**
   * Lists Request
   */
  lists(model: string, condition: any[] = [], refresh = false, special = false): Observable<any> {
    const where = special ? condition : HttpService.toWhere(condition);
    if (refresh) {
      this.bit.listsPageIndex = 1;
    }
    const http = this.req(model + '/lists', {
      page: {
        limit: this.bit.pageLimit,
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
    return special ? http : http.pipe(
      map(res => !res.error ? res.data.lists : [])
    );
  }

  /**
   * MongoLists Request
   */
  mongoLists(model: string, action: string, filter: any = {}, refresh = false, special = false): Observable<any> {
    if (refresh) {
      this.bit.listsPageIndex = 1;
    }
    const http = this.req(model + '/' + action, {
      page: {
        limit: this.bit.pageLimit,
        index: this.bit.listsPageIndex
      },
      filter
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
    return special ? http : http.pipe(
      map(res => !res.error ? res.data.lists : [])
    );
  }

  /**
   * OriginLists Request
   */
  originLists(model: string, condition: any[] = [], special = false): Observable<any> {
    const where = special ? condition : HttpService.toWhere(condition);
    const http = this.req(model + '/originLists', {
      where
    });
    return special ? http : http.pipe(
      map(res => !res.error ? res.data : [])
    );
  }

  /**
   * MongoOriginLists Request
   */
  mongoOriginLists(model: string, action: string, filter: any = {}, special = false): Observable<any> {
    const http = this.req(model + '/' + action, {filter});
    return special ? http : http.pipe(
      map(res => !res.error ? res.data : [])
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
  edit(model: string, data: any, condition: any = []): Observable<any> {
    data.switch = false;
    return !condition ? this.req(model + '/edit', data) : this.req(model + '/edit', Object.assign(data, {
        where: condition
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
    if (extra) {
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
  delete(model: string, condition: any): Observable<any> {
    return condition.hasOwnProperty('id') ? this.req(model + '/delete', condition) : this.req(model + '/delete', {
      where: condition
    });
  }
}
