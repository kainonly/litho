import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { PagesComponent } from './pages/pages.component';
import { pages, PagesModule } from './pages/pages.module';
import { RolesComponent } from './roles/roles.component';
import { roles, RolesModule } from './roles/roles.module';
import { SettingsComponent } from './settings.component';
import { UsersComponent } from './users/users.component';
import { UsersModule } from './users/users.module';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
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
        children: roles,
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
      { path: '', redirectTo: '/settings/pages/home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, PagesModule, RolesModule, UsersModule, RouterModule.forChild(routes)],
  declarations: [SettingsComponent]
})
export class SettingsModule {}
