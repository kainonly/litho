import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Api } from '@weplanx/common';

import { Role } from './types';

@Injectable()
export class RolesService extends Api<Role> {
  protected override model = 'roles';

  hasKey(key: string): Observable<any> {
    return timer(500).pipe(
      switchMap(() =>
        this.http.get<any>(this.url('has-key'), {
          params: { key }
        })
      ),
      map(v => {
        if (v.status === '') {
          return null;
        }
        return { error: true, [v.status]: true };
      })
    );
  }

  findLabels(): Observable<any> {
    return this.http.get(this.url('labels'));
  }
}
