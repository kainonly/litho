import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AnyDto,
  CreateOption,
  FindOneOption,
  Filter,
  ApiOptions,
  FindOneByIdOption,
  FindOption,
  UpdateOption,
  UpdateOneByIdOption,
  R,
  FilterOption
} from '../types';
import { Data } from './data';
import { httpOptions } from './helper';

@Injectable()
export abstract class Api<T> {
  /**
   * 模型名称
   * @protected
   */
  protected model = '';

  constructor(protected http: HttpClient) {}

  /**
   * URL生成
   * @param fragments
   * @protected
   */
  protected url(...fragments: string[]): string {
    return `api${!!this.model ? `/${this.model}` : ''}${fragments.length !== 0 ? `/${fragments.join('/')}` : ''}`;
  }

  /**
   * 创建文档
   * @param doc
   * @param options
   */
  create(doc: T, options?: CreateOption<T>): Observable<R> {
    let { headers } = httpOptions<T>(options as ApiOptions<T>);
    headers = headers.set('wpx-action', 'create');
    return this.http.post(this.url(), doc, {
      headers
    });
  }

  /**
   * 批量创建文档
   * @param docs
   * @param options
   */
  bulkCreate(docs: T[], options?: CreateOption<T>): Observable<R> {
    let { headers } = httpOptions<T>(options as ApiOptions<T>);
    headers = headers.set('wpx-action', 'bulk-create');
    return this.http.post(this.url(), docs, {
      headers
    });
  }

  /**
   * 获取文档总数
   * @param filter
   * @param options
   */
  count(filter?: Filter<T>, options?: FilterOption<T>): Observable<number> {
    return this.http
      .head(this.url('_count'), {
        observe: 'response',
        ...httpOptions<T>(options as ApiOptions<T>, filter)
      })
      .pipe(
        map(res => {
          return parseInt(res.headers.get('wpx-total')!);
        })
      );
  }

  /**
   * 获取文档存在状态
   * @param filter
   * @param options
   */
  exists(filter: Filter<T>, options?: FilterOption<T>): Observable<boolean> {
    return this.http
      .head(this.url('_exists'), {
        observe: 'response',
        ...httpOptions<T>(options as ApiOptions<T>, filter)
      })
      .pipe(
        map(res => {
          return !!res.headers.get('wpx-exists');
        })
      );
  }

  /**
   * 通过筛选获取单个匹配文档
   * @param filter
   * @param options
   */
  findOne(filter: Filter<T>, options?: FindOneOption<T>): Observable<AnyDto<T>> {
    let { headers, params } = httpOptions<T>(options as ApiOptions<T>, filter);
    headers = headers.set('wpx-type', 'find-one');
    return this.http.get<AnyDto<T>>(this.url(), {
      headers,
      params
    });
  }

  /**
   * 通过 ObjectId 获取文档
   * @param id
   * @param options
   */
  findOneById(id: string, options?: FindOneByIdOption<T>): Observable<AnyDto<T>> {
    return this.http.get<AnyDto<T>>(this.url(id), httpOptions<T>(options as ApiOptions<T>));
  }

  /**
   * 通过筛选获取匹配文档
   * @param filter
   * @param options
   */
  find(filter: Filter<T>, options?: FindOption<T>): Observable<Array<AnyDto<T>>> {
    return this.http.get<Array<AnyDto<T>>>(this.url(), httpOptions<T>(options as ApiOptions<T>, filter));
  }

  /**
   * 通过数据源获取分页文档
   * @param data 数据源
   * @param refresh 刷新
   */
  findByPage(data: Data<AnyDto<T>>, refresh?: boolean): Observable<Array<AnyDto<T>>> {
    data.loading = true;
    if (refresh) {
      data.reset();
    }
    let { headers, params } = httpOptions<T>(
      {
        field: data.field,
        sort: data.sort,
        format_filter: data.format_filter
      },
      data.filter
    );
    headers = headers.set('wpx-type', 'find-by-page');
    headers = headers.set('wpx-page', data.index.toString());
    headers = headers.set('wpx-page-size', data.size.toString());
    return this.http
      .get<Array<AnyDto<T>>>(this.url(), {
        observe: 'response',
        headers,
        params
      })
      .pipe(
        map(res => {
          data.total = parseInt(res.headers.get('wpx-total')!);
          data.set(res.body!);
          data.loading = false;
          data.updateCheckedStatus();
          return res.body!;
        })
      );
  }

  /**
   * 通过筛选局部更新匹配文档
   * @param filter
   * @param update
   * @param options
   */
  update(filter: Filter<T>, update: R, options?: UpdateOption<T>): Observable<R> {
    return this.http.patch(this.url(), update, httpOptions<T>(options as ApiOptions<T>, filter));
  }

  /**
   * 通过 ObjectId 局部更新文档
   * @param id
   * @param update
   * @param options
   */
  updateOneById(id: string, update: R, options?: UpdateOneByIdOption<T>): Observable<R> {
    return this.http.patch(this.url(id), update, httpOptions<T>(options as ApiOptions<T>));
  }

  /**
   * 通过 ObjectId 完整更新文档
   * @param id
   * @param doc
   * @param options
   */
  replace(id: string, doc: T, options?: UpdateOneByIdOption<T>): Observable<R> {
    return this.http.put(this.url(id), doc, httpOptions<T>(options as ApiOptions<T>));
  }

  /**
   * 通过 ObjectId 删除文档
   * @param id
   */
  delete(id: string): Observable<R> {
    return this.http.delete(this.url(id));
  }

  /**
   * 通过筛选删除匹配文档
   * @param filter
   * @param options
   */
  bulkDelete(filter: Filter<T>, options?: FilterOption<T>): Observable<R> {
    let { headers } = httpOptions<T>(options as ApiOptions<T>);
    headers = headers.set('wpx-action', 'bulk-delete');
    return this.http.post(this.url(), filter, {
      headers
    });
  }
}
