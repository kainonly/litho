import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { EmailComponent } from './email/email.component';
import { PasswordComponent } from './password/password.component';
import { SafetyComponent } from './safety.component';

const routes: Route[] = [
  {
    path: '',
    component: SafetyComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [SafetyComponent, PasswordComponent, EmailComponent]
})
export class SafetyModule {}
