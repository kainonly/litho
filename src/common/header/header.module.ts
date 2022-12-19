import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [ShareModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class HeaderModule {}
