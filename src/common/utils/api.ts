import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BasicDto, FindOption, FindResult, R } from '@common';

@Injectable()
export abstract class Api<T> {
  protected collection = '';
  protected http: HttpClient = inject(HttpClient);

  create<D>(data: D): Observable<R> {
    return this.http.post(`${this.collection}/create`, data);
  }

  count(params: HttpParams): Observable<number> {
    return this.http.head(`${this.collection}/_count`, { params, observe: 'response' }).pipe(
      map(response => {
        const total = response.headers.get('x-total');
        if (!total) {
          return 0;
        }
        return Number(total);
      })
    );
  }

  exists(params: HttpParams): Observable<boolean> {
    return this.count(params).pipe(map(v => v !== 0));
  }

  findById(id: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.collection}/${id}`, { params });
  }

  find(params: HttpParams, option?: FindOption): Observable<FindResult<T>> {
    let headers = new HttpHeaders();
    if (option) {
      headers = headers.set('x-page', (option.page - 1).toString());
    }
    if (option?.pagesize) {
      headers = headers.set('x-pagesize', option.pagesize.toString());
    }
    return this.http
      .get<T[]>(this.collection, {
        observe: 'response',
        headers,
        params
      })
      .pipe(
        map(response => ({
          data: response.body ?? [],
          total: parseInt(response.headers.get('x-total') ?? '0')
        }))
      );
  }

  update<D extends BasicDto>(data: D): Observable<R> {
    return this.http.post(`${this.collection}/update`, data);
  }

  delete(ids: string[]): Observable<R> {
    return this.http.post(`${this.collection}/delete`, { ids });
  }
}
