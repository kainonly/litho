import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';

import { DepartmentsComponent } from './departments.component';
import { DepartmentsService } from './departments.service';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [ShareModule, NzHighlightModule],
  declarations: [DepartmentsComponent, FormComponent],
  exports: [DepartmentsComponent],
  providers: [DepartmentsService]
})
export class DepartmentsModule {}
