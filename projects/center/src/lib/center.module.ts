import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { audit, AuditModule } from './audit/audit.module';
import { CenterComponent } from './center.component';
import { mine, MineModule } from './mine/mine.module';
import { profile, ProfileModule } from './profile/profile.module';

const routes: Routes = [
  {
    path: '',
    component: CenterComponent,
    children: [
      {
        path: 'mine',
        children: mine,
        data: {
          breadcrumb: '我的'
        }
      },
      {
        path: 'profile',
        children: profile,
        data: {
          breadcrumb: '个人设置'
        }
      },
      {
        path: 'audit',
        children: audit,
        data: {
          breadcrumb: '审计日志'
        }
      },
      { path: '', redirectTo: '/center/mine/workbench', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [WpxModule, WpxShareModule, MineModule, ProfileModule, AuditModule, RouterModule.forChild(routes)],
  declarations: [CenterComponent]
})
export class CenterModule {}
