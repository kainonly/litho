import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxUploadModule } from '@weplanx/ng/upload';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

import { WpxHeaderModule } from '../header/header.module';
import { WpxNavModule } from '../nav/nav.module';
import { AuditComponent } from './audit/audit.component';
import { CenterComponent } from './center.component';
import { ProfileComponent } from './profile/profile.component';
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
        component: WorkComponent
      },
      {
        path: 'safety',
        component: SafetyComponent
      },
      {
        path: 'third-party',
        component: ThirdPartyComponent
      },
      {
        path: 'audit',
        component: AuditComponent
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
    NzDescriptionsModule
  ],
  declarations: [CenterComponent, ProfileComponent, WorkComponent, SafetyComponent, ThirdPartyComponent, AuditComponent]
})
export class CenterModule {}
