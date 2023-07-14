import { NgModule } from '@angular/core';

import { NavComponent } from '@common/components/nav/nav.component';
import { ShareModule } from '@common/share.module';

@NgModule({
  imports: [ShareModule],
  declarations: [NavComponent],
  exports: [NavComponent]
})
export class NavModule {}
