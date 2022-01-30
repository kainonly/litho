import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { NotificationComponent } from './notification/notification.component';
import { PromptComponent } from './prompt/prompt.component';

export const message: Routes = [
  {
    path: 'notification',
    component: PromptComponent,
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
  { path: '', redirectTo: '/center/message/notification', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [NotificationComponent, PromptComponent],
  exports: [NotificationComponent, PromptComponent]
})
export class MessageModule {}
