import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'security',
        loadChildren: () => import('./security/security.module').then(m => m.SecurityModule),
        data: {
          breadcrumb: `Security`
        }
      },
      {
        path: 'sessions',
        loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
        data: {
          breadcrumb: `Sessions`
        }
      },
      {
        path: 'values',
        loadChildren: () => import('./values/values.module').then(m => m.ValuesModule),
        data: {
          breadcrumb: `Dynamic Values`
        }
      },
      { path: '', redirectTo: 'security', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class SettingsModule {}
