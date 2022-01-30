import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { CenterComponent } from './center.component';
import { message, MessageModule } from './message/message.module';
import { other, OtherModule } from './other/other.module';
import { profile, ProfileModule } from './profile/profile.module';

const routes: Routes = [
  {
    path: '',
    component: CenterComponent,
    children: [
      {
        path: 'profile',
        children: profile,
        data: {
          breadcrumb: '个人设置'
        }
      },
      {
        path: 'message',
        children: message,
        data: {
          breadcrumb: '消息中心'
        }
      },
      {
        path: 'other',
        children: other,
        data: {
          breadcrumb: '其他设置'
        }
      },
      { path: '', redirectTo: '/center/profile/info', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [WpxModule, WpxShareModule, ProfileModule, MessageModule, OtherModule, RouterModule.forChild(routes)],
  declarations: [CenterComponent]
})
export class CenterModule {}
