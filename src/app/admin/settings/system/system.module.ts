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
          breadcrumb: $localize`安全策略`
        }
      },
      {
        path: 'sessions',
        loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
        data: {
          breadcrumb: $localize`在线会话`
        }
      },
      {
        path: 'values',
        loadChildren: () => import('./values/values.module').then(m => m.ValuesModule),
        data: {
          breadcrumb: $localize`动态配置`
        }
      },
      { path: '', redirectTo: 'security', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)]
})
export class SystemModule {}
