import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Api } from '@weplanx/common';

import { Role } from './types';

@Injectable()
export class RolesService extends Api<Role> {
  protected override model = 'roles';

  hasName(name: string): Observable<any> {
    return timer(500).pipe(
      switchMap(() =>
        this.http.get<any>(this.url('has-name'), {
          params: { name }
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

  findLabels(): Observable<string[]> {
    return this.http.get<string[]>(this.url('labels'));
  }
}
