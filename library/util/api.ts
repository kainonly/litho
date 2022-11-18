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
  FindOption,
  UpdateOption,
  UpdateOneByIdOption,
  R,
  FilterOption,
  FindByIdOption
} from '../types';
import { WpxData } from './data';
import { setHttpOptions } from './helper';

@Injectable()
export abstract class WpxApi<T> {
  /**
   * 集合名称，必须是小写字母与下划线
   * @protected
   */
  protected collection = '';

  constructor(protected http: HttpClient) {}

  /**
   * URL生成
   * @param fragments 片段
   * @protected
   */
  protected url(...fragments: string[]): string {
    return `${!!this.collection ? `${this.collection}` : ''}${fragments.length !== 0 ? `/${fragments.join('/')}` : ''}`;
  }

  /**
   * 创建文档
   * @param doc 资源数据
   * @param options 配置
   */
  create(doc: T, options?: CreateOption<T>): Observable<R> {
    return this.http.post(this.url(), {
      data: doc,
      format: options?.xdata
    });
  }

  /**
   * 批量创建文档
   * @param docs
   * @param options
   */
  bulkCreate(docs: T[], options?: CreateOption<T>): Observable<R> {
    return this.http.post(this.url('bulk-create'), {
      data: docs,
      format: options?.xdata
    });
  }

  /**
   * 获取文档总数
   * @param filter
   * @param options
   */
  size(filter?: Filter<T>, options?: FilterOption<T>): Observable<number> {
    return this.http
      .get(this.url('_size'), {
        observe: 'response',
        ...setHttpOptions<T>(filter, options as ApiOptions<T>)
      })
      .pipe(map(res => parseInt(res.headers.get('x-total')!)));
  }

  /**
   * 获取文档存在状态
   * @param filter
   * @param options
   */
  exists(filter: Filter<T>, options?: FilterOption<T>): Observable<boolean> {
    return this.size(filter, options).pipe(map(v => v !== 0));
  }

  /**
   * 通过筛选获取匹配文档
   * @param filter
   * @param options
   */
  find(filter: Filter<T>, options?: FindOption<T>): Observable<Array<AnyDto<T>>> {
    return this.http.get<Array<AnyDto<T>>>(this.url(), setHttpOptions(filter, options));
  }

  /**
   * 通过筛选获取单个匹配文档
   * @param filter
   * @param options
   */
  findOne(filter: Filter<T>, options?: FindOneOption<T>): Observable<AnyDto<T>> {
    return this.http.get<AnyDto<T>>(this.url('_one'), setHttpOptions<T>(filter, options as ApiOptions<T>));
  }

  /**
   * 通过 ObjectId 获取文档
   * @param id
   * @param options
   */
  findById(id: string, options?: FindByIdOption<T>): Observable<AnyDto<T>> {
    return this.http.get<AnyDto<T>>(this.url(id), setHttpOptions<T>(undefined, options as ApiOptions<T>));
  }

  /**
   * 获取分页文档
   * @param data 数据源
   * @param refresh 刷新
   */
  pages(data: WpxData<AnyDto<T>>, refresh?: boolean): Observable<Array<AnyDto<T>>> {
    data.loading = true;
    if (refresh) {
      data.reset();
    }
    return this.http
      .get<Array<AnyDto<T>>>(this.url(), {
        observe: 'response',
        ...setHttpOptions<T>(data.filter, {
          // keys: data.keys,
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
    return this.http.patch(
      this.url(),
      {
        data: update,
        format: options?.xdata
      },
      setHttpOptions<T>(filter, options as ApiOptions<T>)
    );
  }

  /**
   * 通过 ObjectId 局部更新文档
   * @param id
   * @param update
   * @param options
   */
  updateById(id: string, update: R, options?: UpdateOneByIdOption<T>): Observable<R> {
    return this.http.patch(this.url(id), {
      data: update,
      format: options?.xdata
    });
  }

  /**
   * 通过 ObjectId 完整更新文档
   * @param id
   * @param doc
   * @param options
   */
  replace(id: string, doc: T, options?: UpdateOneByIdOption<T>): Observable<R> {
    return this.http.put(this.url(id), {
      data: doc,
      format: options?.xdata
    });
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
    return this.http.post(this.url('bulk-delete'), {
      data: filter,
      format: options?.xfilter
    });
  }

  /**
   * 通用排序
   * @param ids
   */
  sort(ids: string[]): Observable<R> {
    return this.http.post(this.url('sort'), {
      data: ids
    });
  }
}
