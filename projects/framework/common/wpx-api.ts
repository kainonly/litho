import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CrudOption, OrderOption, SearchOption } from '../types';
import { getQuerySchema } from './util';
import { WpxData } from './wpx-data';

export class WpxApi {
  constructor(private http: HttpClient, private option: CrudOption) {}

  /**
   * 发起统一请求
   */
  send(path: string, body: Record<string, any> = {}): Observable<any> {
    return this.http.post(`${this.option.baseUrl}/${this.option.model}${path}`, body);
  }

  /**
   * 获取单条数据请求
   */
  findOne(condition: SearchOption[], order?: OrderOption): Observable<Record<string, any> | null> {
    return this.send('/find_one', {
      where: getQuerySchema(condition),
      order
    }).pipe(map(v => (!v.error ? v.data : null)));
  }

  /**
   * 获取原始列表数据请求
   */
  find(condition: SearchOption[] = [], order?: OrderOption): Observable<Array<Record<string, any>>> {
    return this.send('/find', {
      where: getQuerySchema(condition),
      order
    }).pipe(map(v => (!v.error ? v.data : [])));
  }

  /**
   * 获取分页数据请求
   */
  page(data: WpxData, refresh: boolean, persistence: boolean): Observable<Record<string, any> | null> {
    if (refresh || persistence) {
      if (refresh) {
        data.index = 1;
      }
      data.persistence();
    }
    return data.getPage().pipe(
      switchMap(index => {
        data.index = index ?? 1;
        return this.send('/page', {
          page: {
            limit: data.limit,
            index: data.index
          },
          where: getQuerySchema(data.toQuery()),
          order: data.order
        });
      }),
      map(v => {
        data.totals = !v.error ? v.data.total : 0;
        data.loading = false;
        data.checked = false;
        data.indeterminate = false;
        data.batch = false;
        data.checkedNumber = 0;
        return !v.error ? v.data.lists : null;
      })
    );
  }

  /**
   * 新增数据请求
   */
  create(data: Record<string, any>): Observable<any> {
    return this.send('/create', {
      data
    });
  }

  /**
   * 修改数据请求
   */
  update(condition: SearchOption[], data: Record<string, any>): Observable<any> {
    return this.send('/update', {
      where: getQuerySchema(condition),
      data
    });
  }

  /**
   * 删除数据请求
   */
  delete(condition: SearchOption[]): Observable<any> {
    return this.send('/delete', {
      where: getQuerySchema(condition)
    });
  }
}
