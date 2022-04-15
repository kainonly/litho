import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { DepartmentsModule } from './departments/departments.module';
import { OfficeComponent } from './office/office.component';
import { OfficeModule } from './office/office.module';
import { RolesComponent } from './roles/roles.component';
import { RolesModule } from './roles/roles.module';
import { UsersComponent } from './users/users.component';
import { UsersModule } from './users/users.module';

export const organize: Routes = [
  {
    path: 'roles',
    component: RolesComponent,
    data: {
      breadcrumb: '权限组'
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {
      breadcrumb: '团队成员'
    }
  },
  {
    path: 'office',
    component: OfficeComponent,
    data: {
      breadcrumb: '办公协作'
    }
  },
  { path: '', redirectTo: '/settings/organize/roles', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, RolesModule, DepartmentsModule, UsersModule, OfficeModule]
})
export class OrganizeModule {}
