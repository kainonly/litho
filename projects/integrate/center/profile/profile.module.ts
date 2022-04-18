import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxUploadModule } from '@weplanx/ng/upload';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';

import { InfoComponent } from './info/info.component';
import { LinkedComponent } from './linked/linked.component';
import { NotifyComponent } from './notify/notify.component';
import { SafetyComponent } from './safety/safety.component';

export const profile: Routes = [
  {
    path: 'info',
    component: InfoComponent,
    data: {
      breadcrumb: '基本信息'
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
    path: 'linked',
    component: LinkedComponent,
    data: {
      breadcrumb: '帐号绑定'
    }
  },
  {
    path: 'notify',
    component: NotifyComponent,
    data: {
      breadcrumb: '通知设置'
    }
  },
  { path: '', redirectTo: '/center/profile/info', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxUploadModule, NzCascaderModule],
  declarations: [InfoComponent, SafetyComponent, LinkedComponent, NotifyComponent]
})
export class ProfileModule {}
