import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { AccessComponent } from './access/access.component';
import { access, AccessModule } from './access/access.module';
import { AuditComponent } from './audit/audit.component';
import { AuditModule } from './audit/audit.module';
import { LogsComponent } from './logs/logs.component';
import { LogsModule } from './logs/logs.module';
import { PolicyComponent } from './policy/policy.component';
import { PolicyModule } from './policy/policy.module';

export const security: Routes = [
  {
    path: 'policy',
    component: PolicyComponent
  },
  {
    path: 'access',
    component: AccessComponent,
    children: access
  },
  {
    path: 'logs',
    component: LogsComponent,
    data: {
      breadcrumb: '日志检索'
    }
  },
  {
    path: 'audit',
    component: AuditComponent
  }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, PolicyModule, AccessModule, LogsModule, AuditModule]
})
export class SecurityModule {}
