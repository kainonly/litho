import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { ValuesComponent } from './values.component';

const routes: Routes = [
  {
    path: '',
    component: ValuesComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ValuesComponent, FormComponent]
})
export class ValuesModule {}
