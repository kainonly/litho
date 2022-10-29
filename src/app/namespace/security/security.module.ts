import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: 'sessions',
    loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
    data: {
      breadcrumb: '在线会话'
    }
  },
  {
    path: 'audit',
    loadChildren: () => import('./audit/audit.module').then(m => m.AuditModule),
    data: {
      breadcrumb: '审计日志'
    }
  },
  { path: '', redirectTo: 'policy', pathMatch: 'full' }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class SecurityModule {}
