import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { EndpointsComponent } from './endpoints.component';
import { FormComponent } from './form/form.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  {
    path: '',
    component: EndpointsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [EndpointsComponent, FormComponent, ScheduleComponent]
})
export class EntpointsModule {}
