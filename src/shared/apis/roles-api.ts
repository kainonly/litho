import { Injectable } from '@angular/core';

import { Role } from '@shared/models';

import { Api } from './index';

@Injectable({
  providedIn: 'root'
})
export class RolesApi extends Api<Role> {
  override collection = 'roles';
}
