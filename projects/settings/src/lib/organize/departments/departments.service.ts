import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '@weplanx/common';

import { Department } from './types';

@Injectable()
export class DepartmentsService extends Api<Department> {
  protected override model = 'departments';

  /**
   * 关系重组
   * @param id
   * @param parent
   */
  reorganization(id: string, parent: string): Observable<any> {
    return this.updateOneById(
      id,
      {
        $set: {
          parent: parent === 'root' ? null : parent
        }
      },
      {
        format_doc: {
          parent: 'oid'
        }
      }
    );
  }

  /**
   * 排序
   * @param sort
   */
  sort(sort: string[]): Observable<any> {
    return this.http.patch(this.url('sort'), { sort });
  }
}
