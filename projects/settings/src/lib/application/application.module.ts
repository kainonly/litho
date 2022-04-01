import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { RolesComponent } from './roles/roles.component';
import { RolesModule } from './roles/roles.module';
import { UsersComponent } from './users/users.component';
import { UsersModule } from './users/users.module';

export const application: Routes = [
  {
    path: 'roles',
    component: RolesComponent,
    data: {
      breadcrumb: '权限管理'
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {
      breadcrumb: '成员管理'
    }
  },
  { path: '', redirectTo: '/settings/application/roles', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, RolesModule, UsersModule]
})
export class ApplicationModule {}
