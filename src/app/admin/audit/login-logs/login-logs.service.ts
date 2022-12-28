import { Injectable } from '@angular/core';

import { WpxApi } from '@weplanx/ng';

import { AccessLog } from '../types';

@Injectable()
export class LoginLogsService extends WpxApi<AccessLog> {
  protected override collection = 'login_logs';
}
