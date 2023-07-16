import { Injectable } from '@angular/core';

import { User } from '@common/models/user';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class UsersService extends WpxApi<User> {
  protected override collection = 'users';
}
