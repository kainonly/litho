import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Basic, PageOption, R, Result } from '@shared/models';

@Injectable()
export abstract class Api<T> {
  protected collection = '';
  protected http = inject(HttpClient);

  create<D>(data: D): Observable<R> {
    return this.http.post(`${this.collection}/create`, data);
  }

  bulkCreate<D>(data: D[]): Observable<R> {
    return this.http.post(`${this.collection}/bulk_create`, data);
  }

  exists(key: string, value: string): Observable<boolean> {
    const params = new HttpParams().set('key', key).set('q', value);
    return this.http.get<{ exists: boolean }>(`${this.collection}/_exists`, { params }).pipe(map(v => v.exists));
  }

  findById(id: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.collection}/${id}`, { params });
  }

  find(params: HttpParams, option?: PageOption): Observable<Result<T>> {
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

  search<D>(params: HttpParams, pagesize?: number): Observable<(T & D)[]> {
    let headers = new HttpHeaders();
    if (pagesize) {
      headers = headers.set('x-pagesize', pagesize.toString());
    }
    return this.http.get<(T & D)[]>(`${this.collection}/_search`, {
      headers,
      params
    });
  }

  update<D extends Basic>(data: D): Observable<R> {
    return this.http.post(`${this.collection}/update`, data);
  }

  delete(ids: string[]): Observable<R> {
    return this.http.post(`${this.collection}/delete`, { ids });
  }
}
