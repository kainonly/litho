import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';
import { ToolbarModule } from '@common/toolbar/toolbar.module';
import { NzPipesModule } from 'ng-zorro-antd/pipes';

import { AuditModule } from './audit/audit.module';
import { PolicyModule } from './policy/policy.module';
import { SecurityComponent } from './security.component';

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    children: [
      {
        path: 'policy',
        loadChildren: () => import('./policy/policy.module').then(m => m.PolicyModule),
        data: {
          breadcrumb: '策略配置'
        }
      },
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
      { path: '', redirectTo: '/security/policy', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, ToolbarModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [SecurityComponent]
})
export class SecurityModule {}
