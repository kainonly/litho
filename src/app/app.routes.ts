import { Routes } from '@angular/router';

import { AuthorizedComponent } from '@common/components/result/authorized.component';
import { UnauthorizeComponent } from '@common/components/result/unauthorize.component';

import { appGuard } from './app.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'unauthorize',
    component: UnauthorizeComponent
  },
  {
    path: 'authorized',
    component: AuthorizedComponent
  },
  {
    path: '',
    canActivate: [appGuard],
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        data: {
          breadcrumb: `Admin`
        }
      }
    ]
  }
];
