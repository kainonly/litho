import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { EmailComponent } from './email/email.component';
import { InfoComponent } from './info/info.component';
import { PasswordComponent } from './password/password.component';

export const profile: Routes = [
  {
    path: 'info',
    component: InfoComponent,
    data: {
      breadcrumb: '基本信息'
    }
  },
  {
    path: 'email',
    component: EmailComponent,
    data: {
      breadcrumb: '业务邮箱'
    }
  },
  {
    path: 'password',
    component: PasswordComponent,
    data: {
      breadcrumb: '密码设置'
    }
  },
  { path: '', redirectTo: '/center/profile/info', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [InfoComponent, EmailComponent, PasswordComponent],
  exports: [InfoComponent, EmailComponent, PasswordComponent]
})
export class ProfileModule {}
