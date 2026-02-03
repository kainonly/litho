import { Injectable } from '@angular/core';

import { Permission } from '@shared/models';

import { Api } from './index';

@Injectable({
  providedIn: 'root'
})
export class PermissionsApi extends Api<Permission> {
  override collection = 'permissions';
}
