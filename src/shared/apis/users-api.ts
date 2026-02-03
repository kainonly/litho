import { Injectable } from '@angular/core';

import { User } from '@shared/models';

import { Api } from './index';

@Injectable({
  providedIn: 'root'
})
export class UsersApi extends Api<User> {
  override collection = 'users';
}
