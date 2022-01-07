import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { CenterComponent } from './center.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationModule } from './notification/notification.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileModule } from './profile/profile.module';

const routes: Routes = [
  {
    path: '',
    component: CenterComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'notification',
        component: NotificationComponent
      },
      { path: '', redirectTo: '/center/profile', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [WpxModule, WpxShareModule, ProfileModule, NotificationModule, RouterModule.forChild(routes)],
  declarations: [CenterComponent]
})
export class CenterModule {}
