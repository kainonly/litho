import { NgModule } from '@angular/core';

import { ProfileModule } from '@common/profile/profile.module';

import { ShareModule } from '../share.module';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [ShareModule, ProfileModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class HeaderModule {}
