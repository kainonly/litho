import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxModule } from '@weplanx/ng';
import { WpxTableModule } from '@weplanx/ng/table';
import { WpxUploadModule } from '@weplanx/ng/upload';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

import { DepartmentsModule } from '../departments/departments.module';
import { DepartmentComponent } from './department/department.component';
import { FormComponent } from './form/form.component';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
];

@NgModule({
  imports: [
    WpxModule,
    ShareModule,
    WpxUploadModule,
    WpxTableModule,
    NzTreeSelectModule,
    DepartmentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsersComponent, FormComponent, DepartmentComponent],
  providers: [UsersService]
})
export class UsersModule {}
