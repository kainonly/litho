import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Api } from '@weplanx/ng';

import { Role } from './types';

@Injectable()
export class RolesService extends Api<Role> {
  protected override model = 'roles';

  /**
   * 检查权限名称是否存在
   * @param name
   */
  existsName(name: string): Observable<any> {
    return timer(500).pipe(
      switchMap(() => this.exists({ name })),
      map(v => (v ? { error: true, duplicated: v } : null))
    );
  }
}
