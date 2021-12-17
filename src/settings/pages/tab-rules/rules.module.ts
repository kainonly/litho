import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { TabsModule } from '../tabs/tabs.module';
import { RulesComponent } from './rules.component';

const routes: Routes = [
  {
    path: '',
    component: RulesComponent
  }
];

@NgModule({
  imports: [AppShareModule, TabsModule, RouterModule.forChild(routes)],
  declarations: [RulesComponent]
})
export class RulesModule {}
