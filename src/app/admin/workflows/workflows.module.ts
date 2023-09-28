import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CodeviewModule } from '@common/components/codeview/codeview.module';
import { ShareModule } from '@common/share.module';
import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression';

import { ControlsComponent } from './controls/controls.component';
import { DetailComponent } from './detail/detail.component';
import { FormComponent } from './form/form.component';
import { LogsComponent } from './logs/logs.component';
import { SchedulesModule } from './schedules/schedules.module';
import { WorkflowsComponent } from './workflows.component';

const routes: Routes = [
  {
    path: '',
    component: WorkflowsComponent
  }
];

@NgModule({
  imports: [ShareModule, SchedulesModule, CodeviewModule, NzCronExpressionModule, RouterModule.forChild(routes)],
  declarations: [WorkflowsComponent, FormComponent, ControlsComponent, DetailComponent, LogsComponent]
})
export class WorkflowsModule {}
