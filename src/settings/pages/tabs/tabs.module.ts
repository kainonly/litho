import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { TabsComponent } from './tabs.component';

@NgModule({
  imports: [ShareModule, RouterModule],
  declarations: [TabsComponent],
  exports: [TabsComponent]
})
export class TabsModule {}
