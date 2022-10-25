import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { WpxApi } from '@weplanx/ng';

import { User } from './types';

@Injectable()
export class UsersService extends WpxApi<User> {
  protected override collection = 'users';

  /**
   * 检测用户名是否存在
   * @param username
   */
  checkUsername(username: string): Observable<any> {
    return timer(500).pipe(
      switchMap(() => this.exists({ username })),
      map(v => (v ? { error: true, duplicated: v } : null))
    );
  }

  /**
   * 检查电子邮件是否存在
   * @param email
   */
  checkEmail(email: string): Observable<any> {
    return timer(500).pipe(
      switchMap(() => this.exists({ email })),
      map(v => (v ? { error: true, duplicated: v } : null))
    );
  }
}
