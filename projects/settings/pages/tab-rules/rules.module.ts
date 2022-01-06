import { NgModule } from '@angular/core';

import { WpxModule } from '@weplanx/common';
import { WpxLayoutModule } from '@weplanx/common/layout';
import { WpxShareModule } from '@weplanx/components';

import { TabsModule } from '../tabs/tabs.module';
import { RulesComponent } from './rules.component';

@NgModule({
  imports: [WpxModule, WpxLayoutModule, WpxShareModule, TabsModule],
  declarations: [RulesComponent]
})
export class RulesModule {}
