import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'access_logs',
        loadChildren: () => import('./access-logs/access-logs.module').then(m => m.AccessLogsModule),
        data: {
          breadcrumb: '操作记录'
        }
      },
      {
        path: 'login_logs',
        loadChildren: () => import('./login-logs/login-logs.module').then(m => m.LoginLogsModule),
        data: {
          breadcrumb: '登录记录'
        }
      },
      { path: '', redirectTo: 'access_logs', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class AuditModule {}
