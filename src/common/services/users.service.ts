import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { Any } from '@common';
import { User } from '@common/models/user';
import { Api } from '@common/utils/api';

@Injectable({ providedIn: 'root' })
export class UsersService extends Api<User> {
  protected override collection = 'users';

  existsValue(params: HttpParams): Observable<Any> {
    return timer(500).pipe(
      switchMap(() => this.exists(params)),
      map(v => (v ? { error: true, duplicated: v } : null))
    );
  }
}
