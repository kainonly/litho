import { Injectable } from '@angular/core';

import { WpxApi } from '@weplanx/ng';

import { LoginLog } from './login-log';

@Injectable()
export class LoginLogsService extends WpxApi<LoginLog> {
  protected override collection = 'login_logs';
}
