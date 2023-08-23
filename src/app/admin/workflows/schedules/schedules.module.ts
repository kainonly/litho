import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { SchedulesComponent } from './schedules.component';

@NgModule({
  imports: [ShareModule],
  declarations: [SchedulesComponent, FormComponent]
})
export class SchedulesModule {}
