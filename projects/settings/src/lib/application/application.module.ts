import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { PagesComponent } from './pages/pages.component';
import { pages, PagesModule } from './pages/pages.module';
import { RolesComponent } from './roles/roles.component';
import { RolesModule } from './roles/roles.module';
import { UsersComponent } from './users/users.component';
import { UsersModule } from './users/users.module';

export const application: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    children: pages,
    data: {
      breadcrumb: '页面管理'
    }
  },
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
  { path: '', redirectTo: '/settings/application/pages/home', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, PagesModule, RolesModule, UsersModule]
})
export class ApplicationModule {}
