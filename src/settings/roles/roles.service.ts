import { Injectable } from '@angular/core';
import { AsyncSubject } from 'rxjs';

import { Api, WpxService } from '@weplanx/components';

@Injectable()
export class RolesService {
  key$: AsyncSubject<string> = new AsyncSubject<string>();
  api!: Api;

  constructor(private wpx: WpxService) {
    this.api = wpx.api('roles');
  }
}
