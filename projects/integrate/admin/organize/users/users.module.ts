import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxTableModule } from '@weplanx/ng/table';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

import { DepartmentsModule } from '../departments/departments.module';
import { DepartmentComponent } from './department/department.component';
import { FormComponent } from './form/form.component';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxTableModule, NzTreeSelectModule, DepartmentsModule],
  declarations: [UsersComponent, FormComponent, DepartmentComponent],
  providers: [UsersService]
})
export class UsersModule {}
