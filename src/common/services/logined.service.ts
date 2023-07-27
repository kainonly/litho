import { Injectable } from '@angular/core';

import { Logined } from '@common/models/logined';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class LoginedService extends WpxApi<Logined> {
  protected override collection = 'logset_audit';
}
