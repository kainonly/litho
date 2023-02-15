import { Injectable } from '@angular/core';

import { WpxApi } from '@weplanx/ng';

import { AccessLog } from './access-log';

@Injectable()
export class AccessLogsService extends WpxApi<AccessLog> {
  protected override collection = 'access_logs';
}
