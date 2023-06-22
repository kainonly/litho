import { NgModule } from '@angular/core';

import { BlankLayoutComponent } from '@common/components/blank-layout/blank-layout.component';
import { ShareModule } from '@common/share.module';

@NgModule({
  imports: [ShareModule],
  declarations: [BlankLayoutComponent],
  exports: [BlankLayoutComponent]
})
export class BlankLayoutModule {}
