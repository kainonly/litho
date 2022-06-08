import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { CustomizeComponent } from './customize.component';

@NgModule({
  imports: [ShareModule],
  declarations: [CustomizeComponent],
  exports: [CustomizeComponent]
})
export class ManualModule {}
