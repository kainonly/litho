import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { AccessComponent } from './access.component';
import { PolicyComponent } from './policy/policy.component';
import { SessionComponent } from './session/session.component';
import { WhitelistComponent } from './whitelist/whitelist.component';

export const access: Routes = [
  {
    path: 'policy',
    component: PolicyComponent,
    data: {
      breadcrumb: '登录策略'
    }
  },
  {
    path: 'whitelist',
    component: WhitelistComponent,
    data: {
      breadcrumb: 'IP 白名单'
    }
  },
  {
    path: 'session',
    component: SessionComponent,
    data: {
      breadcrumb: '会话'
    }
  },
  { path: '', redirectTo: '/settings/security/access/policy', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [AccessComponent, PolicyComponent, WhitelistComponent, SessionComponent]
})
export class AccessModule {}
