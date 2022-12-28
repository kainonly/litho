import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
        data: {
          breadcrumb: '活跃会话'
        }
      },
      {
        path: 'security',
        loadChildren: () => import('./security/security.module').then(m => m.SecurityModule),
        data: {
          breadcrumb: '安全性'
        }
      },
      { path: '', redirectTo: 'sessions', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class SettingsModule {}
