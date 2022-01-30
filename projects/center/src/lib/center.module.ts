import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { AuditComponent } from './audit/audit.component';
import { AuditModule } from './audit/audit.module';
import { CenterComponent } from './center.component';
import { EmailComponent } from './email/email.component';
import { EmailModule } from './email/email.module';
import { NotificationComponent } from './notification/notification.component';
import { NotificationModule } from './notification/notification.module';
import { PasswordComponent } from './password/password.component';
import { PasswordModule } from './password/password.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileModule } from './profile/profile.module';
import { PromptComponent } from './prompt/prompt.component';
import { PromptModule } from './prompt/prompt.module';
import { ThirdPartyComponent } from './third-party/third-party.component';
import { ThirdPartyModule } from './third-party/third-party.module';

const routes: Routes = [
  {
    path: '',
    component: CenterComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
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
      {
        path: 'notification',
        component: NotificationComponent,
        data: {
          breadcrumb: '消息列表'
        }
      },
      {
        path: 'prompt',
        component: PromptComponent,
        data: {
          breadcrumb: '通知提示'
        }
      },
      {
        path: 'third-party',
        component: ThirdPartyComponent,
        data: {
          breadcrumb: '第三方绑定'
        }
      },
      {
        path: 'audit',
        component: AuditComponent,
        data: {
          breadcrumb: '审计日志'
        }
      },
      { path: '', redirectTo: '/center/profile', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    WpxModule,
    WpxShareModule,
    ProfileModule,
    EmailModule,
    PasswordModule,
    NotificationModule,
    PromptModule,
    ThirdPartyModule,
    AuditModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CenterComponent]
})
export class CenterModule {}
