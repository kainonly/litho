import { NgModule } from '@angular/core';

import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';

import { ShareModule } from '../share.module';
import { FormComponent } from './form/form.component';
import { HeadersPipe } from './jobs/headers.pipe';
import { JobsComponent } from './jobs/jobs.component';
import { SchedulesComponent } from './schedules.component';
import { SchedulesService } from './schedules.service';

@NgModule({
  imports: [ShareModule, NzCodeEditorModule],
  declarations: [SchedulesComponent, FormComponent, JobsComponent, HeadersPipe],
  exports: [SchedulesComponent],
  providers: [SchedulesService]
})
export class SchedulesModule {}
