import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { AnyDto, Api, Page } from '@weplanx/ng';

@Injectable()
export class WpxDynamicService extends Api<any> {
  /**
   * 当前内容
   */
  page?: AnyDto<Page>;

  /**
   * 获取页面内容
   * @param id
   */
  getPage(id: string): Observable<AnyDto<Page>> {
    return this.http.get<AnyDto<Page>>(`pages/${id}`).pipe(
      map(v => {
        this.page = v;
        this.model = v.schema!.key;
        return v;
      })
    );
  }
}
