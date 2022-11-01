import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { RulesComponent } from './rules.component';

const routes: Routes = [
  {
    path: '',
    component: RulesComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [RulesComponent, FormComponent]
})
export class RulesModule {}
