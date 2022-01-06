import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WpxModule } from '@weplanx/common';
import { WpxLayoutModule } from '@weplanx/common/layout';
import { WpxShareModule } from '@weplanx/components';

import { TabsComponent } from './tabs.component';

@NgModule({
  imports: [WpxModule, WpxLayoutModule, WpxShareModule, RouterModule],
  declarations: [TabsComponent],
  exports: [TabsComponent]
})
export class TabsModule {}
