import { NgModule } from '@angular/core';

import { CenterModule } from '@common/center/center.module';

import { ShareModule } from '../share.module';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [ShareModule, CenterModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class HeaderModule {}
