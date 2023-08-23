import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { SchedulesModule } from './schedules/schedules.module';
import { WorkflowsComponent } from './workflows.component';

const routes: Routes = [
  {
    path: '',
    component: WorkflowsComponent
  }
];

@NgModule({
  imports: [ShareModule, SchedulesModule, RouterModule.forChild(routes)],
  declarations: [WorkflowsComponent, FormComponent]
})
export class WorkflowsModule {}
