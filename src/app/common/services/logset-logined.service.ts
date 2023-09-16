import { Injectable } from '@angular/core';

import { LogsetLogined } from '@common/models/logset-logined';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class LogsetLoginedService extends WpxApi<LogsetLogined> {
  protected override collection = 'logset_logined';
}
