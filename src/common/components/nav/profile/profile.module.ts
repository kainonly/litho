import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { AvatarComponent } from './avatar/avatar.component';
import { EmailComponent } from './email/email.component';
import { NameComponent } from './name/name.component';
import { PasswordComponent } from './password/password.component';
import { PhoneComponent } from './phone/phone.component';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [ShareModule],
  declarations: [ProfileComponent, EmailComponent, NameComponent, AvatarComponent, PasswordComponent, PhoneComponent],
  exports: [ProfileComponent]
})
export class ProfileModule {}
