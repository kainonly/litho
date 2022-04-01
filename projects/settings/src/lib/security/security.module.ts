import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { AccessComponent } from './access/access.component';
import { access, AccessModule } from './access/access.module';
import { AuditComponent } from './audit/audit.component';
import { AuditModule } from './audit/audit.module';

export const security: Routes = [
  {
    path: 'access',
    component: AccessComponent,
    children: access,
    data: {
      breadcrumb: '访问控制'
    }
  },
  {
    path: 'audit',
    component: AuditComponent,
    data: {
      breadcrumb: '审计日志'
    }
  }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, AccessModule, AuditModule]
})
export class SecurityModule {}
