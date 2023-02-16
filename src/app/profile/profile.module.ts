import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { AvatarComponent } from './avatar/avatar.component';
import { BackupEmailComponent } from './backup-email/backup-email.component';
import { EmailComponent } from './email/email.component';
import { NameComponent } from './name/name.component';
import { PasswordComponent } from './password/password.component';
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
