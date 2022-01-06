import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule } from '@weplanx/common';
import { WpxLayoutModule } from '@weplanx/common/layout';
import { WpxShareModule } from '@weplanx/components';

import { WpxSettingsComponent } from './wpx-settings.component';

const routes: Routes = [
  {
    path: '',
    component: WpxSettingsComponent,
    children: [
      {
        path: 'pages',
        loadChildren: () => import('./pages/wpx-pages.module').then(m => m.WpxPagesModule),
        data: {
          breadcrumb: '页面管理'
        }
      },
      {
        path: 'roles',
        loadChildren: () => import('./roles/wpx-roles.module').then(m => m.WpxRolesModule),
        data: {
          breadcrumb: '权限管理'
        }
      },
      {
        path: 'users',
        loadChildren: () => import('./users/wpx-users.module').then(m => m.WpxUsersModule),
        data: {
          breadcrumb: '成员管理'
        }
      },
      { path: '', redirectTo: '/settings/pages/home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, WpxLayoutModule, RouterModule.forChild(routes)],
  declarations: [WpxSettingsComponent]
})
export class WpxSettingsModule {}
