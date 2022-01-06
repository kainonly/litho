import { Injectable } from '@angular/core';
import { AsyncSubject } from 'rxjs';

import { Role } from '@settings/roles/dto/role';
import { Api } from '@weplanx/common';

@Injectable()
export class RolesService extends Api.resource('pages')<Role> {
  key$: AsyncSubject<string> = new AsyncSubject<string>();
}
