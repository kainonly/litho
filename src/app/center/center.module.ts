import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule)
  },
  { path: '', redirectTo: '/center/profile', pathMatch: 'full' }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)]
})
export class CenterModule {}
