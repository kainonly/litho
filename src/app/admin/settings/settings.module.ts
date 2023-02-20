import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'integrated',
        children: [
          {
            path: 'cloud',
            loadChildren: () => import('./cloud/cloud.module').then(m => m.CloudModule),
            data: {
              breadcrumb: $localize`公有云`
            }
          },
          {
            path: 'collaboration',
            loadChildren: () => import('./collaboration/collaboration.module').then(m => m.CollaborationModule),
            data: {
              breadcrumb: $localize`企业协作`
            }
          },
          {
            path: 'extend',
            loadChildren: () => import('./extend/extend.module').then(m => m.ExtendModule),
            data: {
              breadcrumb: $localize`扩展服务`
            }
          },
          { path: '', redirectTo: 'cloud', pathMatch: 'full' }
        ],
        data: {
          breadcrumb: $localize`集成`
        }
      },
      {
        path: 'system',
        children: [
          {
            path: 'security',
            loadChildren: () => import('./security/security.module').then(m => m.SecurityModule),
            data: {
              breadcrumb: $localize`安全策略`
            }
          },
          {
            path: 'sessions',
            loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
            data: {
              breadcrumb: $localize`在线会话`
            }
          },
          {
            path: 'values',
            loadChildren: () => import('./values/values.module').then(m => m.ValuesModule),
            data: {
              breadcrumb: $localize`动态配置`
            }
          },
          { path: '', redirectTo: 'security', pathMatch: 'full' }
        ],
        data: {
          breadcrumb: $localize`系统`
        }
      },
      {
        path: 'audit',
        children: [
          {
            path: 'login_logs',
            loadChildren: () => import('./login-logs/login-logs.module').then(m => m.LoginLogsModule),
            data: {
              breadcrumb: $localize`登录日志`
            }
          },
          {
            path: 'access_logs',
            loadChildren: () => import('./access-logs/access-logs.module').then(m => m.AccessLogsModule),
            data: {
              breadcrumb: $localize`访问日志`
            }
          },
          { path: '', redirectTo: 'login_logs', pathMatch: 'full' }
        ],
        data: {
          breadcrumb: $localize`审计`
        }
      },
      { path: '', redirectTo: 'integrated', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [SettingsComponent]
})
export class SettingsModule {}
