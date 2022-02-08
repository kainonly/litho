import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { AnyDto, Api, Page } from '@weplanx/common';

@Injectable()
export class DynamicService extends Api<any> {
  /**
   * 当前页
   */
  page?: AnyDto<Page>;

  /**
   * 获取动态页面属性
   * @param id
   */
  pages(id: string): Observable<AnyDto<Page>> {
    return this.http.get<AnyDto<Page>>(`pages/${id}`).pipe(
      map(v => {
        this.page = v;
        this.model = v.schema!.key;
        return v;
      })
    );
  }
}
