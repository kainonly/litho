import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'function',
        loadChildren: () => import('./function/function.module').then(m => m.FunctionModule),
        data: {
          breadcrumb: '功能设置'
        }
      },
      {
        path: 'team',
        loadChildren: () => import('./team/team.module').then(m => m.TeamModule),
        data: {
          breadcrumb: '团队设置'
        }
      },
      {
        path: 'audit',
        loadChildren: () => import('./audit/audit.module').then(m => m.AuditModule),
        data: {
          breadcrumb: '审计日志'
        }
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        data: {
          breadcrumb: '系统设置'
        }
      },
      {
        path: '',
        redirectTo: 'function',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [ShareModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [AdminComponent]
})
export class AdminModule {}
