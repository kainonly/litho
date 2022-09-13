import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPipesModule } from 'ng-zorro-antd/pipes';

import { TabsModule } from './tabs/tabs.module';

@NgModule({
  exports: [WpxModule, WpxShareModule, NzDescriptionsModule, NzPipesModule, TabsModule]
})
export class ShareModule {}
