import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxFormModule } from '@weplanx/components/form';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

import { DynamicFormComponent } from './dynamic-form.component';

const routes: Routes = [
  {
    path: '',
    component: DynamicFormComponent
  }
];

@NgModule({
  imports: [ShareModule, NzDescriptionsModule, WpxFormModule, RouterModule.forChild(routes)],
  declarations: [DynamicFormComponent]
})
export class DynamicFormModule {}
