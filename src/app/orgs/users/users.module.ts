import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { RolesService } from '@orgs/roles/roles.service';

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
  imports: [ShareModule, DepartmentsModule, RouterModule.forChild(routes)],
  declarations: [UsersComponent, FormComponent, DepartmentComponent],
  providers: [UsersService, RolesService]
})
export class UsersModule {}
