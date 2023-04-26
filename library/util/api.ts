import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WpxData } from './data';
import { setHttpOptions } from './helper';
import {
  AnyDto,
  CreateOption,
  FindOneOption,
  Filter,
  ApiOptions,
  FindOption,
  UpdateOption,
  UpdateOneByIdOption,
  R,
  FilterOption,
  FindByIdOption,
  DeleteOption,
  BulkDeleteOption,
  SortOption,
  ReplaceOption
} from '../types';

@Injectable()
export abstract class WpxApi<T> {
  protected collection = '';

  constructor(protected http: HttpClient) {}

  protected url(...fragments: string[]): string {
    return `${!!this.collection ? `${this.collection}` : ''}${fragments.length !== 0 ? `/${fragments.join('/')}` : ''}`;
  }

  create(doc: T, options?: CreateOption<T>): Observable<R> {
    return this.http.post(this.url(), {
      data: doc,
      format: options?.xdata,
      txn: options?.txn
    });
  }

  bulkCreate(docs: T[], options?: CreateOption<T>): Observable<R> {
    return this.http.post(this.url('bulk_create'), {
      data: docs,
      format: options?.xdata,
      txn: options?.txn
    });
  }

  size(filter?: Filter<T>, options?: FilterOption<T>): Observable<number> {
    return this.http
      .get(this.url('_size'), {
        observe: 'response',
        ...setHttpOptions<T>(filter, options as ApiOptions<T>)
      })
      .pipe(map(res => parseInt(res.headers.get('x-total')!)));
  }

  exists(filter: Filter<T>, options?: FilterOption<T>): Observable<boolean> {
    return this.size(filter, options).pipe(map(v => v !== 0));
  }

  find(filter: Filter<T>, options?: FindOption<T>): Observable<Array<AnyDto<T>>> {
    return this.http.get<Array<AnyDto<T>>>(this.url(), setHttpOptions(filter, options));
  }

  findOne(filter: Filter<T>, options?: FindOneOption<T>): Observable<AnyDto<T>> {
    return this.http.get<AnyDto<T>>(this.url('_one'), setHttpOptions<T>(filter, options as ApiOptions<T>));
  }

  findById(id: string, options?: FindByIdOption<T>): Observable<AnyDto<T>> {
    return this.http.get<AnyDto<T>>(this.url(id), setHttpOptions<T>(undefined, options as ApiOptions<T>));
  }

  pages(data: WpxData<AnyDto<T>>, refresh?: boolean): Observable<Array<AnyDto<T>>> {
    data.loading = true;
    if (refresh) {
      data.reset();
    }
    return this.http
      .get<Array<AnyDto<T>>>(this.url(), {
        observe: 'response',
        ...setHttpOptions<T>(data.filter, {
          keys: data.keys,
          sort: data.sort,
          page: data.page,
          pagesize: data.pagesize,
          xfilter: data.xfilter
        })
      })
      .pipe(
        map(res => {
          data.total = parseInt(res.headers.get('x-total')!);
          data.set(res.body!);
          data.loading = false;
          data.updateCheckedStatus();
          return res.body!;
        })
      );
  }

  update(filter: Filter<T>, update: R, options?: UpdateOption<T>): Observable<R> {
    return this.http.patch(
      this.url(),
      {
        data: update,
        format: options?.xdata,
        txn: options?.txn
      },
      setHttpOptions<T>(filter, options as ApiOptions<T>)
    );
  }

  updateById(id: string, update: R, options?: UpdateOneByIdOption<T>): Observable<R> {
    return this.http.patch(this.url(id), {
      data: update,
      format: options?.xdata,
      txn: options?.txn
    });
  }

  replace(id: string, doc: T, options?: ReplaceOption<T>): Observable<R> {
    return this.http.put(this.url(id), {
      data: doc,
      format: options?.xdata,
      txn: options?.txn
    });
  }

  delete(id: string, options?: DeleteOption<T>): Observable<R> {
    const params = new HttpParams();
    if (options?.txn) {
      params.set('txn', options.txn);
    }
    return this.http.delete(this.url(id), { params });
  }

  bulkDelete(filter: Filter<T>, options?: BulkDeleteOption<T>): Observable<R> {
    return this.http.post(this.url('bulk_delete'), {
      data: filter,
      format: options?.xfilter,
      txn: options?.txn
    });
  }

  sort(key: string, values: string[], options?: SortOption<T>): Observable<R> {
    return this.http.post(this.url('sort'), {
      data: { key, values },
      txn: options?.txn
    });
  }
}
