import { NgModule } from '@angular/core';

import { CenterComponent } from '@common/center/center.component';
import { ShareModule } from '@common/share.module';

@NgModule({
  imports: [ShareModule],
  declarations: [CenterComponent]
})
export class CenterModule {}
