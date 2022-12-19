import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { TabsComponent } from './tabs.component';

@NgModule({
  imports: [ShareModule],
  declarations: [TabsComponent],
  exports: [TabsComponent]
})
export class TabsModule {}
