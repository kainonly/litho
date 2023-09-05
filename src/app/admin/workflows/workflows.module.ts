import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression';

import { ControlsComponent } from './controls/controls.component';
import { DetailComponent } from './detail/detail.component';
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
  imports: [ShareModule, SchedulesModule, NzCronExpressionModule, RouterModule.forChild(routes), NzCarouselModule],
  declarations: [WorkflowsComponent, FormComponent, ControlsComponent, DetailComponent]
})
export class WorkflowsModule {}
