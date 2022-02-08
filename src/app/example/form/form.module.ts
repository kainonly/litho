import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxFormModule } from '@weplanx/components/form';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

import { FormComponent } from './form.component';

const routes: Routes = [
  {
    path: '',
    component: FormComponent
  }
];

@NgModule({
  imports: [ShareModule, NzDescriptionsModule, WpxFormModule, RouterModule.forChild(routes)],
  declarations: [FormComponent]
})
export class FormModule {}
