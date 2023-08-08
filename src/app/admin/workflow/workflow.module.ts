import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { WorkflowComponent } from './workflow.component';

const routes: Routes = [
  {
    path: '',
    component: WorkflowComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [WorkflowComponent]
})
export class WorkflowModule {}
