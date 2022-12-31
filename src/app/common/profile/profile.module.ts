import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [ShareModule],
  declarations: [ProfileComponent],
  exports: [ProfileComponent]
})
export class ProfileModule {}
