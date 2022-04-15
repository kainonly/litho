import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { TabsModule } from './tabs/tabs.module';

@NgModule({
  exports: [WpxModule, WpxShareModule, TabsModule]
})
export class ShareModule {}
