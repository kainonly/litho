import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { LoginLogsComponent } from './login-logs.component';
import { LoginLogsService } from './login-logs.service';

const routes: Routes = [
  {
    path: '',
    component: LoginLogsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [LoginLogsComponent],
  providers: [LoginLogsService]
})
export class LoginLogsModule {}
