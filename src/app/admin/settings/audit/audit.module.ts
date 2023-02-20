import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
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
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class AuditModule {}
