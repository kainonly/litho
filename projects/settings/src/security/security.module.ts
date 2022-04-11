import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { AuditComponent } from './audit/audit.component';
import { PolicyComponent } from './policy/policy.component';
import { SessionComponent } from './session/session.component';
import { WhitelistComponent } from './whitelist/whitelist.component';

export const security: Routes = [
  {
    path: 'policy',
    component: PolicyComponent,
    data: {
      breadcrumb: '策略'
    }
  },
  {
    path: 'whitelist',
    component: WhitelistComponent,
    data: {
      breadcrumb: '白名单'
    }
  },
  {
    path: 'session',
    component: SessionComponent,
    data: {
      breadcrumb: '会话'
    }
  },
  {
    path: 'audit',
    component: AuditComponent,
    data: {
      breadcrumb: '审计'
    }
  }
];

@NgModule({
  declarations: [PolicyComponent, WhitelistComponent, SessionComponent, AuditComponent],
  imports: [WpxShareModule, WpxModule]
})
export class SecurityModule {}
