import { NgModule } from '@angular/core';

import { AvatarComponent } from '@common/profile/avatar/avatar.component';
import { BackupEmailComponent } from '@common/profile/backup-email/backup-email.component';
import { EmailComponent } from '@common/profile/email/email.component';
import { NameComponent } from '@common/profile/name/name.component';
import { PasswordComponent } from '@common/profile/password/password.component';
import { ShareModule } from '@common/share.module';

import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [ShareModule],
  declarations: [
    ProfileComponent,
    EmailComponent,
    NameComponent,
    AvatarComponent,
    PasswordComponent,
    BackupEmailComponent
  ],
  exports: [ProfileComponent]
})
export class ProfileModule {}
