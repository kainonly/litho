import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule } from '@weplanx/common';
import { WpxLayoutModule } from '@weplanx/common/layout';
import { WpxShareModule } from '@weplanx/components';

import { PagesSerivce } from './pages/pages.serivce';
import { RolesService } from './roles/roles.service';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
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
      { path: '', redirectTo: '/settings/pages/home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, WpxLayoutModule, RouterModule.forChild(routes)],
  declarations: [SettingsComponent],
  providers: [RolesService, PagesSerivce]
})
export class SettingsModule {}
