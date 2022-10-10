import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { HeadersPipe } from './jobs/headers.pipe';
import { JobsComponent } from './jobs/jobs.component';
import { SchedulesComponent } from './schedules.component';
import { SchedulesService } from './schedules.service';

const routes: Routes = [
  {
    path: '',
    component: SchedulesComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [SchedulesComponent, FormComponent, JobsComponent, HeadersPipe],
  providers: [SchedulesService]
})
export class SchedulesModule {}
