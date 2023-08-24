import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression';

import { ControlsComponent } from './controls/controls.component';
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
  imports: [ShareModule, SchedulesModule, NzCronExpressionModule, RouterModule.forChild(routes)],
  declarations: [WorkflowsComponent, FormComponent, ControlsComponent]
})
export class WorkflowsModule {}
