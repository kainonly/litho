import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { QuickComponent } from './quick.component';

@NgModule({
  imports: [ShareModule],
  declarations: [QuickComponent],
  exports: [QuickComponent]
})
export class QuickModule {}
