import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { APIOption, APIResponse, CollectionValue, PageData } from '../types';
import { Collection } from './collection';
import { getSearchValues, getSortValues } from './helper';

export class Api {
  /**
   * HTTPClient 依赖
   */
  private http!: HttpClient;
  /**
   * 基础路径
   */
  private baseUrl!: string;
  /**
   * 模型路径
   */
  private model!: string;

  constructor(option: APIOption) {
    this.http = option.http;
    this.baseUrl = option.baseUrl;
    this.model = option.model;
  }

  /**
   * 发起统一请求
   */
  send<T>(path: string, body: Record<string, unknown> = {}): Observable<APIResponse<T>> {
    return this.http.post(`${this.baseUrl}/${this.model}${path}`, body) as Observable<APIResponse<T>>;
  }

  /**
   * 获取单条数据请求
   */
  findOne<T>(where: Record<string, unknown>, sort?: Record<string, number>): Observable<T> {
    return this.send('/find_one', {
      where,
      sort
    }).pipe(map(v => (!v.code ? v.data : null))) as Observable<T>;
  }

  findOneById<T>(id: string, sort?: Record<string, number>): Observable<T> {
    return this.send('/find_one', {
      id,
      sort
    }).pipe(map(v => (!v.code ? v.data : null))) as Observable<T>;
  }

  /**
   * 获取原始列表数据请求
   */
  find<T>(where?: Record<string, unknown>, sort?: Record<string, number>): Observable<T[]> {
    return this.send('/find', {
      where,
      sort
    }).pipe(map(v => (!v.code ? v.data : []))) as Observable<T[]>;
  }

  findById<T>(id: string[], sort?: Record<string, number>): Observable<T[]> {
    return this.send('/find', {
      id,
      sort
    }).pipe(map(v => (!v.code ? v.data : []))) as Observable<T[]>;
  }

  /**
   * 获取分页数据请求
   */
  findByPage<T extends CollectionValue>(coll: Collection<T>): Observable<PageData<T>> {
    return this.send('/find_by_page', {
      page: {
        size: coll.pageSize,
        index: coll.pageIndex
      },
      where: !coll.searchText ? getSearchValues(coll.searchOptions) : { $text: { $search: coll.searchText } },
      sort: getSortValues(coll.sortOptions)
    }).pipe(
      map(v => {
        if (!v.code) {
        }
        return v.data;
      })
    ) as Observable<PageData<T>>;
  }

  /**
   * 新增数据请求
   */
  create(body: Record<string, unknown>): Observable<APIResponse<never>> {
    return this.send('/create', body);
  }

  /**
   * 修改数据请求
   */
  update(where: Record<string, unknown>, data: Record<string, unknown>): Observable<APIResponse<never>> {
    return this.send('/update', {
      where,
      update: {
        $set: data
      }
    });
  }

  updateById(id: string, data: Record<string, unknown>): Observable<APIResponse<never>> {
    return this.send('/update', {
      id,
      update: {
        $set: data
      }
    });
  }

  /**
   * 删除数据请求
   */
  delete(where: Record<string, unknown>): Observable<APIResponse<never>> {
    return this.send('/delete', {
      where
    });
  }

  deleteById(id: string[]): Observable<APIResponse<never>> {
    return this.send('/delete', {
      id
    });
  }
}
