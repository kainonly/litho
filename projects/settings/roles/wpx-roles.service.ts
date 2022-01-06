import { Injectable } from '@angular/core';
import { AsyncSubject } from 'rxjs';

import { Api } from '@weplanx/common';

import { Role } from './dto/role';

@Injectable()
export class WpxRolesService extends Api<Role> {
  protected override model = 'roles';
  key$: AsyncSubject<string> = new AsyncSubject<string>();
}
