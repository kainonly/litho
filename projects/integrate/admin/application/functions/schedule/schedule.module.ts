import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { ScheduleComponent } from './schedule.component';

@NgModule({
  imports: [ShareModule],
  declarations: [ScheduleComponent],
  exports: [ScheduleComponent]
})
export class ScheduleModule {}
