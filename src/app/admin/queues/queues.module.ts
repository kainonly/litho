import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { DetailComponent } from './detail/detail.component';
import { FormComponent } from './form/form.component';
import { QueuesComponent } from './queues.component';

const routes: Routes = [
  {
    path: '',
    component: QueuesComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [QueuesComponent, FormComponent, DetailComponent]
})
export class QueuesModule {}
