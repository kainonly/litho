import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { TabsComponent } from './tabs.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [TabsComponent],
  exports: [TabsComponent]
})
export class TabsModule {}
