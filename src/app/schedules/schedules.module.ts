import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { SchedulesComponent } from './schedules.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulesComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [SchedulesComponent]
})
export class SchedulesModule {}
