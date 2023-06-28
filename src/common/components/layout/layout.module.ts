import { NgModule } from '@angular/core';

import { LayoutComponent } from '@common/components/layout/layout.component';
import { ShareModule } from '@common/share.module';

@NgModule({
  imports: [ShareModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {}
