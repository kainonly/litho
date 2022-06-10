import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { OfficeComponent } from './office.component';
import { PlatformComponent } from './platform/platform.component';
import { RedirectComponent } from './redirect/redirect.component';

@NgModule({
  imports: [ShareModule],
  declarations: [OfficeComponent, PlatformComponent, RedirectComponent],
  exports: [OfficeComponent]
})
export class OfficeModule {}
