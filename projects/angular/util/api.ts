import { HttpClient, HttpParams } from '@angular/common/http';
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
import { setHttpParams } from './helper';

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
    return `${!!this.model ? `${this.model}` : ''}${fragments.length !== 0 ? `/${fragments.join('/')}` : ''}`;
  }

  /**
   * 生成 Query DSL URL
   * @param fragments
   * @private
   */
  private dsl(...fragments: string[]): string {
    return `dsl/${this.url(...fragments)}`;
  }

  /**
   * 创建文档
   * @param doc
   * @param options
   */
  create(doc: T, options?: CreateOption<T>): Observable<R> {
    return this.http.post(this.dsl(), doc);
  }

  /**
   * 批量创建文档
   * @param docs
   * @param options
   */
  bulkCreate(docs: T[], options?: CreateOption<T>): Observable<R> {
    return this.http.post(this.dsl('bulk-create'), docs);
  }

  /**
   * 获取文档总数
   * @param filter
   * @param options
   */
  size(filter?: Filter<T>, options?: FilterOption<T>): Observable<number> {
    return this.http
      .head(this.dsl('_size'), {
        observe: 'response',
        params: setHttpParams<T>(filter, options as ApiOptions<T>)
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
      .head(this.dsl('_exists'), {
        observe: 'response',
        params: setHttpParams<T>(filter, options as ApiOptions<T>)
      })
      .pipe(
        map(res => {
          return res.headers.get('wpx-exists') === 'true';
        })
      );
  }

  /**
   * 通过筛选获取单个匹配文档
   * @param filter
   * @param options
   */
  findOne(filter: Filter<T>, options?: FindOneOption<T>): Observable<AnyDto<T>> {
    return this.http.get<AnyDto<T>>(this.dsl('_one'), {
      params: setHttpParams<T>(filter, options as ApiOptions<T>)
    });
  }

  /**
   * 通过 ObjectId 获取文档
   * @param id
   * @param options
   */
  findOneById(id: string, options?: FindOneByIdOption<T>): Observable<AnyDto<T>> {
    return this.http.get<AnyDto<T>>(this.dsl(id), {
      params: setHttpParams<T>(undefined, options as ApiOptions<T>)
    });
  }

  /**
   * 通过筛选获取匹配文档
   * @param filter
   * @param options
   */
  find(filter: Filter<T>, options?: FindOption<T>): Observable<Array<AnyDto<T>>> {
    return this.http.get<Array<AnyDto<T>>>(this.dsl(), {
      params: setHttpParams<T>(filter, options as ApiOptions<T>)
    });
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
    return this.http
      .get<Array<AnyDto<T>>>(this.dsl('_pages'), {
        observe: 'response',
        params: setHttpParams<T>(data.filter, {
          keys: data.keys,
          sort: data.sort,
          page: data.page,
          pagesize: data.pagesize,
          xfilter: data.xfilter
        })
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
    return this.http.patch(this.dsl(), update, {
      params: setHttpParams<T>(filter, options as ApiOptions<T>)
    });
  }

  /**
   * 通过 ObjectId 局部更新文档
   * @param id
   * @param update
   * @param options
   */
  updateOneById(id: string, update: R, options?: UpdateOneByIdOption<T>): Observable<R> {
    return this.http.patch(this.dsl(id), update, {
      params: setHttpParams<T>(undefined, options as ApiOptions<T>)
    });
  }

  /**
   * 通过 ObjectId 完整更新文档
   * @param id
   * @param doc
   * @param options
   */
  replace(id: string, doc: T, options?: UpdateOneByIdOption<T>): Observable<R> {
    return this.http.put(this.dsl(id), doc, {
      params: setHttpParams<T>(undefined, options as ApiOptions<T>)
    });
  }

  /**
   * 通过 ObjectId 删除文档
   * @param id
   */
  delete(id: string): Observable<R> {
    return this.http.delete(this.dsl(id));
  }

  /**
   * 通过筛选删除匹配文档
   * @param filter
   * @param options
   */
  bulkDelete(filter: Filter<T>, options?: FilterOption<T>): Observable<R> {
    return this.http.post(this.dsl('bulk-delete'), filter);
  }

  /**
   * 通用排序
   * @param ids
   */
  sort(ids: string[]): Observable<R> {
    return this.http.post(this.dsl('sort'), ids);
  }
}
