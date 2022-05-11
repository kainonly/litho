import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { FeishuComponent } from './feishu/feishu.component';
import { OfficeComponent } from './office.component';
import { RedirectComponent } from './redirect/redirect.component';

@NgModule({
  imports: [ShareModule],
  declarations: [OfficeComponent, FeishuComponent, RedirectComponent],
  exports: [OfficeComponent]
})
export class OfficeModule {}
