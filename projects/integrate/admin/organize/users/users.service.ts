import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Api } from '@weplanx/common';

import { User } from './types';

@Injectable()
export class UsersService extends Api<User> {
  protected override model = 'users';

  existsUsername(username: string): Observable<any> {
    return timer(500).pipe(
      switchMap(() => this.exists({ username })),
      map(v => (v ? { error: true, duplicated: v } : null))
    );
  }
}
