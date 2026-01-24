import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '@shared';

@Component({
  imports: [SharedModule],
  selector: 'app-settings-login-status',
  templateUrl: './login-status.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginStatus {}
