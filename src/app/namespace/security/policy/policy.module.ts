import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { IpListComponent } from './ip-list/ip-list.component';
import { IpLockComponent } from './ip-lock/ip-lock.component';
import { PolicyComponent } from './policy.component';
import { PwdStrategyComponent } from './pwd-strategy/pwd-strategy.component';
import { PwdTtlComponent } from './pwd-ttl/pwd-ttl.component';
import { SessionComponent } from './session/session.component';
import { UserLockComponent } from './user-lock/user-lock.component';

const routes: Routes = [
  {
    path: '',
    component: PolicyComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [
    PolicyComponent,
    SessionComponent,
    UserLockComponent,
    IpLockComponent,
    IpListComponent,
    PwdStrategyComponent,
    PwdTtlComponent
  ]
})
export class PolicyModule {}
