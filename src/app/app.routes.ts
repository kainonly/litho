import { Routes } from '@angular/router';

import { adminRoutes } from './admin/admin.routes';
import { appGuard } from './app.guard';
import { loginRoutes } from './login/login.routes';

export const routes: Routes = [
  ...loginRoutes,
  {
    path: 'unauthorize',
    loadComponent: () => import('@common/components/result/unauthorize.component').then(m => m.UnauthorizeComponent)
  },
  {
    path: 'authorized',
    loadComponent: () => import('@common/components/result/authorized.component').then(m => m.AuthorizedComponent)
  },
  {
    path: '',
    canActivate: [appGuard],
    children: [...adminRoutes, { path: '', redirectTo: 'admin', pathMatch: 'full' }]
  }
];
