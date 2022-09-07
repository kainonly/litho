import { NgModule } from '@angular/core';

import { ShareModule } from '@console/common/share.module';
import { WpxService } from '@weplanx/ng';

import { CustomizeSlotComponent } from './customize-slot.component';
import { CustomizeComponent } from './customize.component';

@NgModule({
  imports: [ShareModule],
  declarations: [CustomizeSlotComponent, CustomizeComponent]
})
export class CustomizeModule {
  constructor(wpx: WpxService) {
    wpx.setComponent('customize', '自制', CustomizeSlotComponent);
  }
}
