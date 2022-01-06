import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule } from '@weplanx/common';
import { WpxLayoutModule } from '@weplanx/common/layout';
import { WpxShareModule } from '@weplanx/components';

import { TabsModule } from '../tabs/tabs.module';
import { RulesComponent } from './rules.component';

const routes: Routes = [
  {
    path: '',
    component: RulesComponent
  }
];

@NgModule({
  imports: [WpxModule, WpxLayoutModule, WpxShareModule, TabsModule, RouterModule.forChild(routes)],
  declarations: [RulesComponent]
})
export class RulesModule {}
