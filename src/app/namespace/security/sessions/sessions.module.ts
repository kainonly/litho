import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { RolesService } from '../../orgs/roles/roles.service';
import { UsersService } from '../../orgs/users/users.service';
import { SessionsComponent } from './sessions.component';
import { SessionsService } from './sessions.service';

const routes: Routes = [
  {
    path: '',
    component: SessionsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [SessionsComponent],
  providers: [SessionsService, UsersService, RolesService]
})
export class SessionsModule {}
