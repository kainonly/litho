import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { UsersService } from '@orgs/users/users.service';

import { AuditComponent } from './audit.component';

const routes: Routes = [
  {
    path: '',
    component: AuditComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [AuditComponent],
  providers: [UsersService]
})
export class AuditModule {}
