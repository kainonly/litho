import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { SchedulesComponent } from './schedules.component';

@NgModule({
  imports: [ShareModule],
  declarations: [SchedulesComponent],
  exports: [SchedulesComponent]
})
export class SchedulesModule {}
