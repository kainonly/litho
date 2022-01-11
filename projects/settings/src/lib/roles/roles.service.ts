import { Injectable } from '@angular/core';

import { Api } from '@weplanx/common';

import { Role } from './types';

@Injectable()
export class RolesService extends Api<Role> {
  protected override model = 'roles';
}
