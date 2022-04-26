import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxUploadModule } from '@weplanx/ng/upload';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPipesModule } from 'ng-zorro-antd/pipes';

import { WpxHeaderModule } from '../header/header.module';
import { WpxNavModule } from '../nav/nav.module';
import { AuditComponent } from './audit/audit.component';
import { CenterComponent } from './center.component';
import { ProfileComponent } from './profile/profile.component';
import { EmailComponent } from './safety/email/email.component';
import { PasswordComponent } from './safety/password/password.component';
import { SafetyComponent } from './safety/safety.component';
import { ThirdPartyComponent } from './third-party/third-party.component';
import { WorkComponent } from './work/work.component';

const routes: Routes = [
  {
    path: '',
    component: CenterComponent,
    children: [
      {
        path: 'work',
        component: WorkComponent,
        data: {
          breadcrumb: '工作台'
        }
      },
      {
        path: 'safety',
        component: SafetyComponent,
        data: {
          breadcrumb: '安全设置'
        }
      },
      {
        path: 'third-party',
        component: ThirdPartyComponent,
        data: {
          breadcrumb: '第三方关联'
        }
      },
      {
        path: 'audit',
        component: AuditComponent,
        data: {
          breadcrumb: '日志'
        }
      },
      { path: '', redirectTo: '/center/work', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    WpxModule,
    WpxShareModule,
    WpxHeaderModule,
    WpxUploadModule,
    WpxNavModule,
    RouterModule.forChild(routes),
    NzDescriptionsModule,
    NzPipesModule
  ],
  declarations: [
    CenterComponent,
    ProfileComponent,
    WorkComponent,
    SafetyComponent,
    EmailComponent,
    PasswordComponent,
    ThirdPartyComponent,
    AuditComponent
  ]
})
export class CenterModule {}
