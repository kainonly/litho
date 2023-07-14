import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavModule } from '@common/components/nav/nav.module';
import { ShareModule } from '@common/share.module';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'overview',
        loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
        data: {
          breadcrumb: `总览`
        }
      },
      {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),
        data: {
          breadcrumb: `项目`
        }
      },
      {
        path: 'monitor',
        loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule),
        data: {
          breadcrumb: `监控`
        }
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        data: {
          breadcrumb: `成员`
        }
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        data: {
          breadcrumb: `设置`
        }
      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, NavModule, RouterModule.forChild(routes)],
  declarations: [AdminComponent]
})
export class AdminModule {}
