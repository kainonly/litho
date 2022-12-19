import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { HeadersPipe } from './jobs/headers.pipe';
import { JobsComponent } from './jobs/jobs.component';
import { TimingComponent } from './timing.component';

const routes: Routes = [
  {
    path: '',
    component: TimingComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [TimingComponent, FormComponent, JobsComponent, HeadersPipe]
})
export class TimingModule {}
