import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { CenterComponent } from './center.component';

@NgModule({
  imports: [ShareModule],
  declarations: [CenterComponent],
  exports: [CenterComponent]
})
export class CenterModule {}
