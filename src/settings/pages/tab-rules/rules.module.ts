import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { TabsModule } from '../tabs/tabs.module';
import { RulesComponent } from './rules.component';

const routes: Routes = [
  {
    path: '',
    component: RulesComponent
  }
];

@NgModule({
  imports: [ShareModule, TabsModule, RouterModule.forChild(routes)],
  declarations: [RulesComponent]
})
export class RulesModule {}
