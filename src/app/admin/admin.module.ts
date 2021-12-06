import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { HeaderModule } from '../header/header.module';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: 'settings',
    component: AdminComponent,
    data: {
      breadcrumb: '应用设置'
    },
    children: [
      {
        path: 'apps',
        loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule),
        data: {
          breadcrumb: '应用管理'
        }
      },
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
        data: {
          breadcrumb: '页面管理'
        }
      },
      {
        path: 'roles',
        loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
        data: {
          breadcrumb: '权限管理'
        }
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        data: {
          breadcrumb: '成员管理'
        }
      },
      { path: '', redirectTo: '/admin/settings/apps', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/admin/settings/apps', pathMatch: 'full' }
];

@NgModule({
  imports: [AppShareModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [AdminComponent]
})
export class AdminModule {}
