import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Api } from '@weplanx/common';

import { User } from './types';

@Injectable()
export class UsersService extends Api<User> {
  protected override model = 'users';

  hasUsername(username: string): Observable<any> {
    return timer(500).pipe(
      switchMap(() =>
        this.http.get<any>(this.url('has-username'), {
          params: { username }
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
}
