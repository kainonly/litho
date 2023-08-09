import { NgModule } from '@angular/core';

import { TotpComponent } from '@common/components/nav/profile/totp/totp.component';
import { ShareModule } from '@common/share.module';

import { AvatarComponent } from './avatar/avatar.component';
import { EmailComponent } from './email/email.component';
import { NameComponent } from './name/name.component';
import { PasswordComponent } from './password/password.component';
import { PhoneComponent } from './phone/phone.component';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [ShareModule],
  declarations: [
    ProfileComponent,
    EmailComponent,
    NameComponent,
    AvatarComponent,
    PasswordComponent,
    PhoneComponent,
    TotpComponent
  ],
  exports: [ProfileComponent]
})
export class ProfileModule {}
