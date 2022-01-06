import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CenterComponent } from '@center/center.component';
import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
    component: CenterComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule)
      },
      { path: '', redirectTo: '/center/profile', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [CenterComponent]
})
export class CenterModule {}
