import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { IpListComponent } from './ip-list/ip-list.component';
import { IpLockComponent } from './ip-lock/ip-lock.component';
import { PasswordExpireComponent } from './password-expire/password-expire.component';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { PolicyComponent } from './policy.component';
import { SessionExpireComponent } from './session-expire/session-expire.component';
import { TimeParsePipe } from './time.parse.pipe';
import { UserLockComponent } from './user-lock/user-lock.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [
    PolicyComponent,
    TimeParsePipe,
    SessionExpireComponent,
    UserLockComponent,
    IpLockComponent,
    IpListComponent,
    PasswordStrengthComponent,
    PasswordExpireComponent
  ]
})
export class PolicyModule {}
