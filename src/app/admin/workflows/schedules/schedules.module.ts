import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { KeysComponent } from './keys/keys.component';
import { SchedulesComponent } from './schedules.component';

@NgModule({
  imports: [ShareModule],
  declarations: [SchedulesComponent, FormComponent, KeysComponent]
})
export class SchedulesModule {}
