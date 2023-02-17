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
              breadcrumb: $localize`Public Cloud`
            }
          },
          {
            path: 'collaboration',
            loadChildren: () => import('./collaboration/collaboration.module').then(m => m.CollaborationModule),
            data: {
              breadcrumb: $localize`Collaboration`
            }
          },
          {
            path: 'extend',
            loadChildren: () => import('./extend/extend.module').then(m => m.ExtendModule),
            data: {
              breadcrumb: $localize`Extend Services`
            }
          },
          { path: '', redirectTo: 'cloud', pathMatch: 'full' }
        ],
        data: {
          breadcrumb: $localize`Integrated`
        }
      },
      {
        path: 'system',
        children: [
          {
            path: 'security',
            loadChildren: () => import('./security/security.module').then(m => m.SecurityModule),
            data: {
              breadcrumb: $localize`Security`
            }
          },
          {
            path: 'sessions',
            loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
            data: {
              breadcrumb: $localize`Sessions`
            }
          },
          {
            path: 'values',
            loadChildren: () => import('./values/values.module').then(m => m.ValuesModule),
            data: {
              breadcrumb: $localize`Values`
            }
          },
          { path: '', redirectTo: 'security', pathMatch: 'full' }
        ],
        data: {
          breadcrumb: $localize`System`
        }
      },
      {
        path: 'audit',
        children: [
          {
            path: 'login_logs',
            loadChildren: () => import('./login-logs/login-logs.module').then(m => m.LoginLogsModule),
            data: {
              breadcrumb: $localize`Login Logs`
            }
          },
          {
            path: 'access_logs',
            loadChildren: () => import('./access-logs/access-logs.module').then(m => m.AccessLogsModule),
            data: {
              breadcrumb: $localize`Access Logs`
            }
          },
          { path: '', redirectTo: 'login_logs', pathMatch: 'full' }
        ],
        data: {
          breadcrumb: $localize`Audit`
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
