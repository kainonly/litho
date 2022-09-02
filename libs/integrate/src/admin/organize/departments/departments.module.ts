import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxTableModule } from '@weplanx/ng/table';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

import { DepartmentsComponent } from './departments.component';
import { DepartmentsService } from './departments.service';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxTableModule, NzTreeModule, NzTreeSelectModule],
  declarations: [DepartmentsComponent, FormComponent],
  exports: [DepartmentsComponent],
  providers: [DepartmentsService]
})
export class DepartmentsModule {}
